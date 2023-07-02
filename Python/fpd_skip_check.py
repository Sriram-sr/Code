import re

def can_skip_fpd(fpd):
    return bool(re.search('.*em-primcu', fpd.lower()) or re.search('ssd*', fpd.lower()))

fpd = 'SSDa-MICRON'
print(can_skip_fpd(fpd))
