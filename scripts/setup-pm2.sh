#!/bin/bash
cd ~/app/renxt-api
pm2 start yarn --name rentx_api -- start
