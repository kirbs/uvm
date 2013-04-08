#!/usr/bin/python
# -*- coding: utf-8 -*-
 
import sys, os
import re
import pickle
import glob
from sqlalchemy import *
from sqlalchemy.orm import sessionmaker
from models import uVM, SrvXen
from bdd import connect_bdd 
import datetime


def ConvertOctetToMega(val):
    conv = (val / (1024*1024))
    return conv

def CheckInstall(dirdata,reposvn):
    if not os.path.isdir(reposvn):
        print "Installation"
        srvApi = getSrvApi()
        os.system("cd %s ; svn co svn://%s/trunk/uvm" % (dirdata, srvApi))
    else:
        print "Installation deja effectue"

def maj_repo(reposvn):
    os.system("cd %s/xen ; svn up; svn delete *.pickle; svn ci -m 'suppression des anciens pickles'" % reposvn)

def getSrvApi():
    site = os.uname()[1].split(".")[-4][0]
    if site == "s":
        srv = "api01.vprod.virt.s1.p.fti.net"
    elif site == "b":
        srv = "api02.vprod.virt.b4.p.fti.net"
    elif site == "m":
        srv = "api03.vprod.virt.m1.p.fti.net"
    return srv



def InsertIntoUvm(session, reposvn):

    os.system("cd %s ; svn up xen" % reposvn)
    for i in GetPickleFiles():
      pk_file = open('%s' % i,'rb')
      DictInfo = pickle.load(pk_file)
      pk_file.close()

      date_today = datetime.date.today()
      for vmname in DictInfo['vm'].keys():
        check_date = session.query(uVM.date_uvm).filter(uVM.date_uvm == date_today).filter(uVM.vm_name == vmname).first()
        if check_date == None:
          new_uvm = uVM(
              date_today,
              DictInfo['vm'][vmname]["uname"],
              vmname,
              DictInfo['vm'][vmname]["pfs_nomcourt"],
              DictInfo['vm'][vmname]["pfs"],
              DictInfo['vm'][vmname]["site"],
              DictInfo['vm'][vmname]["salle"],
              DictInfo['vm'][vmname]["domain"],
              ConvertOctetToMega(DictInfo['vm'][vmname]["mem_used"]),
              DictInfo['vm'][vmname]["cpu_used"],
              DictInfo['vm'][vmname]["disk_used"],
              DictInfo['vm'][vmname]["uVM_Memory"],
              DictInfo['vm'][vmname]["uVM_CPU"],
              DictInfo['vm'][vmname]["uVM_Disk"],
              DictInfo['vm'][vmname]["uvm"]
          )
          session.add(new_uvm)
          session.commit()
          print "insert de %s" % vmname
        else:
          print "%s deja inseré" % vmname
          
      for hostname in DictInfo['xen'].keys():
        check_srvxen = session.query(SrvXen.srvxen_name).filter(SrvXen.srvxen_name == hostname).first()
        if check_srvxen == None:
          new_srvxen = SrvXen(
              hostname,
              ConvertOctetToMega(DictInfo['xen'][hostname]["mem_total"]),
              DictInfo['xen'][hostname]["cpu_total"],
              DictInfo['xen'][hostname]["disk_total"],
              DictInfo['xen'][hostname]["uVM_Memory_total"],
              DictInfo['xen'][hostname]["uVM_CPU_total"],
              DictInfo['xen'][hostname]["uVM_Disk_total"],
              DictInfo['xen'][hostname]["uvm_total"]
          )
          session.add(new_srvxen)
          session.commit()
          print "insert du serveur xen : %s" % hostname
        else:
          print "Mise a jour du serveur xen %s" % hostname
      


def GetPickleFiles():
    PickleFiles = glob.glob('/opt/hosting/run/exploit/current/var/data/uvm/xen/*')
    return PickleFiles



def main():
    dirdata = "/opt/hosting/run/exploit/current/var/data"
    reposvn = "%s/uvm" % dirdata
    CheckInstall(dirdata,reposvn)

    conn = connect_bdd(echo=False)
    engine = conn.connect()
    Session = sessionmaker(bind=engine)
    session = Session()

    InsertIntoUvm(session, reposvn)
    maj_repo(reposvn)



if __name__ == '__main__':
    main()
