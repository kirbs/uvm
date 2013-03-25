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
    srv_xen    = Column('srv_xen', String(50))
    vm_name    = Column('vm_name', String(50))
    pfs_mere   = Column('pfs_mere', String(50))
    pfs_fille  = Column('pfs_fille', String(50))
    memory     = Column('memory', Integer)
    cpu        = Column('cpu', Integer)
    disk       = Column('disk', Integer)
    uvm_memory = Column('uvm_memory', Integer)
    uvm_cpu    = Column('uvm_cpu', Integer)
    uvm_disk   = Column('uvm_disk', Integer)
    uvm_total  = Column('uvm_total', Integer)

    def __init__(self, date_uvm, srv_xen, vm_name, pfs_mere, pfs_fille, memory, cpu, disk, uvm_memory, uvm_cpu, uvm_disk, uvm_total):
        self.date_uvm   = date_uvm
        self.srv_xen    = srv_xen
        self.vm_name    = vm_name
        self.pfs_mere   = pfs_mere
        self.pfs_fille  = pfs_fille
        self.memory     = memory
        self.cpu        = cpu
        self.disk       = disk
        self.uvm_memory = uvm_memory 
        self.uvm_cpu    = uvm_cpu
        self.uvm_disk   = uvm_disk
        self.uvm_total  = uvm_total 

Base.metadata.create_all(engine)
