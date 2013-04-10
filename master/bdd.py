#!/usr/bin/python
# -*- coding: utf-8 -*-


from sqlalchemy import *


class connect_bdd:
    def __init__(self, echo=True):
        self.base_bdd = "uvm.db"
        self.verbose_bdd = echo

    def connect(self):
        #engine = create_engine('sqlite:///%s' % self.base_bdd, echo=self.verbose_bdd)
        engine = create_engine('mysql://uvm:x_MZNl6YTq@api02.vprod.virt.b4.p.fti.net/uvm')
        return engine

