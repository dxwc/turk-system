#!/bin/bash
let imgWidth=1233  # to change
let imgHeight=2496 # to change
let parts=5        # to change

let eachHeight=$((imgHeight/parts))
let shiftx=0
let shifty=0

let counter=0
while (($counter < $parts)) ; do
    echo "Generating part $((counter+1))"
    convert -extract "$imgWidth""x""$eachHeight"+"$shiftx"+"$shifty" full.png part"_$((counter+1))".png
    counter=$((counter + 1))
    shifty=$((shifty + eachHeight))
done
