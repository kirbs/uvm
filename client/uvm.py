#!/usr/bin/python
# -*- coding: utf-8 -*-


import os,sys, math
from xen.xm.XenAPI import Session
from optparse import OptionParser
import pickle



class uVM(object):
  def __init__(self):
    self.session = Session('httpu:///var/run/xend/xen-api.sock')
    self.session.xenapi.login_with_password('', '')
    self.HOST_ID = self.session.xenapi.host.get_all()
    self.uVM = {"mem" : 536870912 , "cpu": 1 , "disk" : 18 }
    self.ListAllVM = {}
    self.ListInfoXen = {}
    self.ListAllInfo = {}
    self.uname = os.uname()[1]
    self.CheckExec()
    self.dirdata = "/opt/hosting/run/exploit/current/var/data"
    self.reposvn = "%s/uvm" % self.dirdata
    self.localpickle = "%s/xen/%s.pickle" % (self.reposvn,self.uname)
    self.CheckInstall()
    self.UnMega = (1024*1024)
    self.UnGiga = (self.UnMega * 1024)
    self.SvnUpdatePickleDWH()
    self.OpenPickleDWH()
    
  def CheckExec(self):
      plateforme = self.uname.split('xen0')[1].split('.')[0][:-2]
      if plateforme == "node" or plateforme == "bas" or plateforme == "ct":
          print "Ce serveur n'est pas autorisé a executer l'uvm"
          sys.exit()

  def CheckInstall(self):
    if not os.path.isdir(self.reposvn):
      print "Installation"
      srvApi = self.getSrvApi()
      os.system("cd %s ; /usr/bin/svn co svn://%s/trunk/uvm" % (self.dirdata, srvApi))
    else:
      print "Installation deja effectue"

  def getSrvApi(self):
    site = self.uname.split(".")[-4][0]
    if site == "s":
      srv = "api01.vprod.virt.s1.p.fti.net"
    elif site == "b":
      srv = "api02.vprod.virt.b4.p.fti.net"
    elif site == "m":
      srv = "api03.vprod.virt.m1.p.fti.net"
    return srv


  def SvnUpdatePickleDWH(self):
    print "Mise a jour du dwk.pickle"
    os.system("cd %s ; /usr/bin/svn up dwh" % self.reposvn)
    # svn up dwk.pickle

  def OpenPickleDWH(self):
    #pkl_file = open('/root/dwh_new.pickle',  'rb')
    try :
      pkl_file = open('%s/dwh/dwh.pickle' % self.reposvn,  'rb')
    except:
      print "ERREUR !!! : le fichier dwh.pickle est inexistant"
      sys.exit()
    self.dictDWH = pickle.load(pkl_file)
    pkl_file.close()

  def search_vm(self):
    VM_ID = []
    if self.is_batch() or self.is_allvm():
      VM_ID = self.session.xenapi.VM.get_all()
    else:
      try:
        VM = self.vm_name.split(",")
      except:
        print "il manque l'option --vm"
        print ""
        os.system("uvm --help")
        sys.exit()
      for i in VM:
        try:
          VM_ID.append(self.session.xenapi.VM.get_by_name_label(i)[0])
        except:
          pass
    return VM_ID

  def get_memory(self):
    memory = int(self.session.xenapi.VM_metrics.get_memory_actual(self.vm_metrics))
    return memory

  def get_cpu(self):
    cpu = int(self.session.xenapi.VM_metrics.get_VCPUs_number(self.vm_metrics))
    return cpu

  def get_disk(self):
    disk_tmp = os.popen("LANG=POSIX /usr/sbin/xenmgt-size-vm %s" % self.vm_label, "r")
    disk = float(disk_tmp.readline().split("GB")[0])
    return disk

  def get_pfs(self, hostname):
    self.pfs = []
    for i in self.dictDWH:
      if i["host_nom"] == hostname:
        self.pfs = {"pfs_nomcourt": i["ppfs_nomcourt"],
                    "pfs_nomlong": i["ocp_nom"]}

  def get_site(self, hostname):
    self.site = []
    for i in self.dictDWH:
      if i["host_nom"] == hostname:
        self.site = {"site": i["bat_nom"]}

  def get_salle(self, hostname):
    self.salle = []
    for i in self.dictDWH:
      if i["host_nom"] == hostname:
        self.salle = {"salle": i["sal_nom"]}

  def get_domain(self, hostname):
    self.domain = []
    self.domain = {"domain" : "0"}
    
  def get_bulle(self, pfs):
     bulle = pfs.split('.')[-2]
     return bulle
    
  def getMemTotalXen(self):
      HOST_METRICS_ID = self.session.xenapi.host.get_metrics(self.HOST_ID[0])
      MemTotalXen = self.ConvertOctotetToMega(int(self.session.xenapi.host_metrics.get_memory_total(HOST_METRICS_ID))) 
      return MemTotalXen
  
  def getMemFreeXen(self):
      HOST_METRICS_ID = self.session.xenapi.host.get_metrics(self.HOST_ID[0])
      MemFreeXen = self.ConvertOctotetToMega(int(self.session.xenapi.host_metrics.get_memory_free(HOST_METRICS_ID))) 
      return MemFreeXen
  
  def getCpuTotalXen(self):
      HOST_CPU = self.session.xenapi.host.get_record(self.HOST_ID[0])
      CpuTotalXen = HOST_CPU['cpu_configuration']['nr_cpus']
      return CpuTotalXen
  
  def getDiskTotalXen(self):
      VAL = os.popen('/usr/sbin/vgs --units b -o vg_size | /bin/grep -v -i size','rb').readlines()
      DiskTotalXen = 0
      for i in VAL:
        DiskTotalXen = DiskTotalXen + int(i.strip()[:-1])
      return (DiskTotalXen / self.UnGiga)
  
  def getDiskFreeXen(self):
      VAL = os.popen('/usr/sbin/vgs --units b -o vg_free | /bin/grep -v -i free','rb').readlines()
      DiskFreeXen = 0
      for i in VAL:
        DiskFreeXen = DiskFreeXen + int(i.strip()[:-1])
      return (DiskFreeXen / self.UnGiga)
    
  def getSystemProductName(self):
      VAL = os.popen('/usr/sbin/dmidecode -s system-product-name | /usr/bin/tail -n 1', 'rb').readlines()
      for i in VAL:
        SystemProductName = i.strip()
      return SystemProductName

  def get_info(self):
    VMID = self.search_vm()
 
    for vm in VMID:
      record = self.session.xenapi.VM.get_record(vm)
      self.vm_label = record["name_label"]
      if record["domid"] !=  "0":
        if record["power_state"] == "Running":
          self.vm_metrics = record["metrics"]
          self.vm_VBD = record["VBDs"]

          metric_mem = self.get_memory()
          metric_cpu = self.get_cpu()
          metric_disk = self.get_disk()
          self.get_pfs(self.vm_label)
          self.get_site(self.vm_label)
          self.get_salle(self.vm_label)
          self.get_domain(self.vm_label)
          if self.pfs == []:
            self.pfs = {"pfs_nomcourt": "none", "pfs_nomlong":"none"}
          if self.site == []:
            self.site = {"site": "none"}
          if self.salle == []:
            self.salle = {"salle": "none"}
        else:
          metric_mem = "not running"
          metric_cpu = "not running"
          metric_disk = "not running"

        self.ListAllVM[self.vm_label] = {"uname"        : self.uname,
                                         "pfs_nomcourt" : self.pfs["pfs_nomcourt"],
                                         "pfs"          : self.pfs["pfs_nomlong"],
                                         "site"         : self.site["site"],
                                         "salle"        : self.salle["salle"],
                                         "domain"       : self.domain["domain"],
                                         "mem_used"     : metric_mem,
                                         "cpu_used"     : metric_cpu,
                                         "disk_used"    : metric_disk}
    self.get_pfs(self.uname)
    self.get_site(self.uname)
    self.get_salle(self.uname)
    self.get_domain(self.uname)   
    self.ListInfoXen[self.uname] = { "pfs_nomcourt" : self.pfs["pfs_nomcourt"],
                                     "pfs"          : self.pfs["pfs_nomlong"],
                                     "site"         : self.site["site"],
                                     "domain"       : self.domain["domain"],
                                     "bulle"        : self.get_bulle(self.pfs["pfs_nomlong"]),
                                     "mem_total"    : self.getMemTotalXen(),
                                     "cpu_total"    : self.getCpuTotalXen(),
                                     "disk_total"   : self.getDiskTotalXen(),
                                     "mem_free"     : self.getMemFreeXen(),
                                     "disk_free"    : self.getDiskFreeXen(),
                                     "hardware"     : self.getSystemProductName()}
    
    self.ListAllInfo = {"vm" : self.ListAllVM, "xen" : self.ListInfoXen}
    
  def is_batch(self):
    if self.batch == True:
      return True
    else:
      return False

  def is_allvm(self):
    if self.allvm == True:
      return True
    else:
      return False


  def OutputFormat(self):
    if self.output == "text":
      self.OutputFormatText()
    elif self.output == "csv":
      self.OutputFormatCsv()
    else:
      print "Sortie inconnu"
      self.OutputFormatText()


  def ConvertOctotetToMega(self, val):
    conv = (val / self.UnMega)
    return conv
   
  def OutputFormatCsv(self):
    print "Serveur Xen;PFS mere;PFS;VM;Memory (Mo);CPUs;Disk (Go);uVM Memory;uVM CPU;uVM Disk;uVM"
    for i in self.ListAllVM:
      print "%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s" % (
        self.ListAllVM[i]["uname"],
        self.ListAllVM[i]["pfs_nomcourt"],
        self.ListAllVM[i]["pfs"],
        i,
        self.ConvertOctotetToMega(self.ListAllVM[i]["mem_used"]),
        self.ListAllVM[i]["cpu_used"],
        self.ListAllVM[i]["disk_used"],
        self.ListAllVM[i]["uVM_Memory"],
        self.ListAllVM[i]["uVM_CPU"],
        self.ListAllVM[i]["uVM_Disk"],
        self.ListAllVM[i]["uvm"])
       
  def OutputFormatText(self):
    for i in self.ListAllVM:
      print "%s (%s - %s) correspond a %s uVMs" % (i,
                                                   self.ListAllVM[i]["pfs_nomcourt"],
                                                   self.ListAllVM[i]["pfs"],
                                                   self.ListAllVM[i]["uvm"])


  def SvnCommitPickle(self):
    print "Commit du pickle %s" % self.localpickle
    os.system("cd %s/xen/ ; /usr/bin/svn up;  /usr/bin/svn add %s" % (self.reposvn,self.localpickle))
    os.system("cd %s/xen/ ; /usr/bin/svn ci -m 'auto commit'" % self.reposvn)
    os.system("rm -rf %s" % self.reposvn)
    # svn ci hostname.pickle

  def OutputFormatBatch(self):
    #pickle.dump(self.ListAllVM,open('%s' % self.localpickle, 'wb'))
    pickle.dump(self.ListAllInfo,open('%s' % self.localpickle, 'wb'))
    self.SvnCommitPickle()
   

  def CalculuVMs(self):
    for i in self.ListAllVM:
      self.ListAllVM[i]["uVM_Memory"] = self.ListAllVM[i]["mem_used"] / self.uVM["mem"]
      self.ListAllVM[i]["uVM_CPU"] = self.ListAllVM[i]["cpu_used"] / self.uVM["cpu"]
      self.ListAllVM[i]["uVM_Disk"] = int(round(math.ceil(self.ListAllVM[i]["disk_used"] / self.uVM["disk"]),0))
      self.ListAllVM[i]["uvm"] = max([self.ListAllVM[i]["uVM_Memory"],self.ListAllVM[i]["uVM_CPU"],self.ListAllVM[i]["uVM_Disk"]])

  def CalculHostuVMsTotal(self):
    for i in self.ListInfoXen:
      self.ListInfoXen[i]["uVM_Memory_free"] = int(self.ListInfoXen[i]["mem_free"] / self.ConvertOctotetToMega(int(self.uVM["mem"])))
      self.ListInfoXen[i]["uVM_Disk_free"] = int(round(math.ceil(self.ListInfoXen[i]["disk_free"] / self.uVM["disk"]),0))
      self.ListInfoXen[i]["uVM_Memory_total"] = int(self.ListInfoXen[i]["mem_total"] / self.ConvertOctotetToMega(int(self.uVM["mem"])))
      self.ListInfoXen[i]["uVM_CPU_total"] = int(self.ListInfoXen[i]["cpu_total"]) / self.uVM["cpu"]
      self.ListInfoXen[i]["uVM_Disk_total"] = int(round(math.ceil(self.ListInfoXen[i]["disk_total"] / self.uVM["disk"]),0))
      self.ListInfoXen[i]["uvm_total"] = max([self.ListInfoXen[i]["uVM_Memory_total"],self.ListInfoXen[i]["uVM_CPU_total"],self.ListInfoXen[i]["uVM_Disk_total"]])

  def result(self):
    self.get_info()
    self.CalculuVMs()
    self.CalculHostuVMsTotal()
    if self.is_batch():
      self.OutputFormatBatch()
    else:
      self.OutputFormat()


  def analyse_commande(self):
    parser = OptionParser(usage="%uvm --vm=VM1[,VM2,VM3,..] | --cron | [-o <output>]", version="%prog 1.0.1")
    parser.add_option("--vm", action="store", type="string", dest="vm_name",help="FDQN de la vm", metavar="VM1[,VM2,VM3,..]" )
    parser.add_option("-a", "--allvm", action="store_true", dest="allvm", default=False, help="toutes les vm", metavar="ALLVM")
    parser.add_option("-b","--batch", action="store_true", dest="batch", default=False, help="mode batch", metavar="BATCH")
    parser.add_option("-o","--output", action="store", type="string", dest="output", default = "text", help="affichage de sortie (text, csv) par defaut la sortie est en text", metavar="OUTPUT")

    (options, args) = parser.parse_args()
    if options.vm_name == "" and options.batch == False:
      print "Option manquante\n"
      os.system("uvm --help")
      sys.exit()
    return (options, args)

def main():
  uvm = uVM()
  "Analyse des parametres de la ligne de commande"
  (options, args) = uvm.analyse_commande()
  uvm.vm_name = options.vm_name
  uvm.allvm = options.allvm
  uvm.batch = options.batch
  uvm.output = options.output

  uvm.result()


if __name__ == '__main__':
  main()
