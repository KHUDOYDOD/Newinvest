#!/usr/bin/env python3
import os
import sys

# Change to the Invest directory
os.chdir('Invest')

# Add the Invest directory to Python path
sys.path.insert(0, '.')

# Run the main script
if __name__ == "__main__":
    exec(open('download_financial_fortress.py').read())
