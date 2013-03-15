#!/usr/bin/python
# -*- coding: utf-8 -*-
 
import sys, os
import re
import pickle
import glob
from sqlalchemy import *
from sqlalchemy.orm import sessionmaker
from models import uVM
from bdd import connect_bdd 
import datetime


def check_date(session):
    date_today = datetime.date.today()
    print date_today
    check_date = session.query(uVM.date_uvm).filter(uVM.date_uvm == date_today).first()
    print check_date
    if check_date == None:
        print "insert"
        InsertIntoUvm(session)
    else:
        print "deja inserer"

def InsertIntoUvm(session):
    dirdata = "/opt/hosting/run/exploit/current/var/data"
    reposvn = "%s/uvm" % dirdata

    os.system("cd %s ; svn up xen" % reposvn)
    for i in GetPickleFiles():
      pk_file = open('%s' % i,'rb')
      DictInfoVM = pickle.load(pk_file)
      pk_file.close()

      date_today = datetime.date.today()
      for vmname in DictInfoVM.keys():
        new_uvm = uVM(
            date_today,
            DictInfoVM[vmname]["uname"],
            vmname,
            DictInfoVM[vmname]["pfs_nomcourt"],
            DictInfoVM[vmname]["pfs"],
            DictInfoVM[vmname]["mem_used"],
            DictInfoVM[vmname]["cpu_used"],
            DictInfoVM[vmname]["disk_used"],
            DictInfoVM[vmname]["uVM_Memory"],
            DictInfoVM[vmname]["uVM_CPU"],
            DictInfoVM[vmname]["uVM_Disk"],
            DictInfoVM[vmname]["uvm"]
        )

        session.add(new_uvm)
        session.commit()

def ListUvm(session):

    resultat = session.query(uVM).all()

    for i in resultat:
        print i.id_uvm, 'is', i.srv_xen, i.vm_name, i.pfs_mere, i.pfs_fille, i.memory, i.cpu, i.disk, i.uvm_memory, i.uvm_cpu, i.uvm_disk, i.uvm_total



       
def ListUvm_byPFS(session):
    resultatPFSmere = session.query(distinct(uVM.pfs_mere)).all()
    for PFSmere in resultatPFSmere:
        pfsm = PFSmere
        resultUvmByPFSmere =  session.query(uVM.uvm_total).filter(uVM.pfs_mere == PFSmere[0]).all()
        cpt = 0
        for UvmByPFSmere in resultUvmByPFSmere:
          cpt = cpt + UvmByPFSmere[0]
        print "- %s -- %s uvm total" % (PFSmere[0],cpt)

        resultatPFSfille = session.query(distinct(uVM.pfs_fille)).filter(uVM.pfs_mere == PFSmere[0]).all()
        for PFSfille in resultatPFSfille:
            resultUvmByPFSfille =  session.query(uVM.uvm_total).filter(uVM.pfs_fille == PFSfille[0]).all()
            cpt2 = 0
            for UvmByPFSfille in resultUvmByPFSfille:
              cpt2 = cpt2 + UvmByPFSfille[0]
            print "     - %s -- %s uvm total" % (PFSfille[0],cpt2)
            resultatvm = session.query(uVM).filter(uVM.pfs_mere == PFSmere[0]).filter(uVM.pfs_fille == PFSfille[0]).all()

            for i in resultatvm:
                print "          %s : %s" % (i.vm_name, i.uvm_total)



def GetPickleFiles():
    PickleFiles = glob.glob('/opt/hosting/run/exploit/current/var/data/uvm/xen/*')
    return PickleFiles



def main():
    conn = connect_bdd(echo=False)
    engine = conn.connect()
    Session = sessionmaker(bind=engine)
    session = Session()

    #InsertIntoUvm(session)
    #ListUvm(session)
    #ListUvm_byPFS(session)
    check_date(session)



if __name__ == '__main__':
    main()
