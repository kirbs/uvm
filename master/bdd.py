#!/usr/bin/python
# -*- coding: utf-8 -*-


from sqlalchemy import *


class connect_bdd:
    def __init__(self, echo=True):
        self.base_bdd = "uvm.db"
        self.verbose_bdd = echo

    def connect(self):
        #engine = create_engine('sqlite:///%s' % self.base_bdd, echo=self.verbose_bdd)
        engine = create_engine('mysql://root:sdfsdf@localhost/uvm')
        return engine

