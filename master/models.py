#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from bdd import connect_bdd

#engine = create_engine('sqlite:///uvm.db', echo=True)
conn = connect_bdd()
engine = conn.connect()

Base = declarative_base()

class uVM(Base):
    __tablename__ = 'uVM'

    id_uvm     = Column('uvm_id', Integer, primary_key=True)
    date_uvm   = Column('date_uvm', String(10))
    srv_xen    = Column('srv_xen', String(255))
    vm_name    = Column('vm_name', String(255))
    pfs_mere   = Column('pfs_mere', String(255))
    pfs_fille  = Column('pfs_fille', String(255))
    site       = Column('site', String(255))
    salle      = Column('salle', String(255))
    domain     = Column('domain', String(255))
    memory     = Column('memory', Integer)
    cpu        = Column('cpu', Integer)
    disk       = Column('disk', Integer)
    uvm_memory = Column('uvm_memory', Integer)
    uvm_cpu    = Column('uvm_cpu', Integer)
    uvm_disk   = Column('uvm_disk', Integer)
    uvm_total  = Column('uvm_total', Integer)

    def __init__(self, date_uvm, srv_xen, vm_name, pfs_mere, pfs_fille, site, salle, domain, memory, cpu, disk, uvm_memory, uvm_cpu, uvm_disk, uvm_total):
        self.date_uvm   = date_uvm
        self.srv_xen    = srv_xen
        self.vm_name    = vm_name
        self.pfs_mere   = pfs_mere
        self.pfs_fille  = pfs_fille
        self.site       = site
        self.salle      = salle
        self.domain     = domain
        self.memory     = memory
        self.cpu        = cpu
        self.disk       = disk
        self.uvm_memory = uvm_memory 
        self.uvm_cpu    = uvm_cpu
        self.uvm_disk   = uvm_disk
        self.uvm_total  = uvm_total 
        
class SrvXen(Base):
    __tablename__ = 'SrvXen'

    id_srvxen        = Column('srvxen_id', Integer, primary_key=True)
    srvxen_name      = Column('srvxen_name', String(255))
    pfs_mere         = Column('pfs_mere', String(255))
    pfs_fille        = Column('pfs_fille', String(255))
    site             = Column('site', String(255))
    domain           = Column('domain', String(255))
    bulle            = Column('bulle', String(255))
    hardware         = Column('hardware', String(255))
    memory_total     = Column('memory_total', Integer)
    cpu_total        = Column('cpu_total', Integer)
    disk_total       = Column('disk_total', Integer)
    memory_free      = Column('memory_free', Integer)
    disk_free        = Column('disk_free', Integer)
    uvm_memory_total = Column('uvm_memory_total', Integer)
    uvm_cpu_total    = Column('uvm_cpu_total', Integer)
    uvm_disk_total   = Column('uvm_disk_total', Integer)
    uvm_memory_free  = Column('uvm_memory_free', Integer)
    uvm_disk_free    = Column('uvm_disk_free', Integer)
    uvm_total        = Column('uvm_total', Integer)

    def __init__(self, srvxen_name, pfs_mere, pfs_fille, site, domain, bulle, hardware, memory_total, cpu_total, disk_total, memory_free, disk_free, uvm_memory_total, uvm_cpu_total, uvm_disk_total, uvm_memory_free, uvm_disk_free, uvm_total):
        self.srvxen_name      = srvxen_name
        self.pfs_mere         = pfs_mere
        self.pfs_fille        = pfs_fille
        self.site             = site
        self.domain           = domain
        self.bulle            = bulle
        self.hardware         = hardware
        self.memory_total     = memory_total
        self.cpu_total        = cpu_total
        self.disk_total       = disk_total
        self.memory_free      = memory_free
        self.disk_free        = disk_free
        self.uvm_memory_total = uvm_memory_total 
        self.uvm_cpu_total    = uvm_cpu_total
        self.uvm_disk_total   = uvm_disk_total
        self.uvm_memory_free  = uvm_memory_free 
        self.uvm_disk_free    = uvm_disk_free
        self.uvm_total        = uvm_total

Base.metadata.create_all(engine)
