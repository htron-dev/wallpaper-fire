#!/bin/bash
# My first script

read -p 'Video path:' videoPath

xwinwrap -ni -fs -s -st -sp -b -nf -- mplayer -zoom -nosound -loop 0 -saturation 100 -brightness -20 -quiet -contrast 50 -wid WID $videoPath