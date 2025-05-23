#!/usr/bin/env python3
"""
Financial Fortress Downloader

This script clones the Financial Fortress repository from GitHub
without making any modifications to the original code.
"""

import os
import sys
import subprocess
import shutil

def check_git_installed():
    """Check if Git is installed on the system."""
    try:
        subprocess.run(["git", "--version"], 
                      stdout=subprocess.PIPE, 
                      stderr=subprocess.PIPE, 
                      check=True)
        return True
    except (subprocess.SubprocessError, FileNotFoundError):
        return False

def clone_repository(repo_url, target_dir=None):
    """
    Clone the specified repository to the target directory.
    
    Args:
        repo_url: URL of the GitHub repository
        target_dir: Directory to clone into (optional)
    
    Returns:
        bool: Success status
        str: Message with details
    """
    if target_dir is None:
        # Extract repo name from URL for the default target directory
        repo_name = repo_url.split('/')[-1]
        if repo_name.endswith('.git'):
            repo_name = repo_name[:-4]  # Remove .git extension
        target_dir = repo_name
    
    # Check if target directory already exists and remove it
    if os.path.exists(target_dir):
        print(f"Directory '{target_dir}' already exists. Removing it...")
        try:
            shutil.rmtree(target_dir)
        except Exception as e:
            return False, f"Error removing existing directory '{target_dir}': {str(e)}"
    
    try:
        # Clone the repository
        subprocess.run(["git", "clone", repo_url, target_dir], 
                      stdout=subprocess.PIPE, 
                      stderr=subprocess.PIPE, 
                      check=True)
        return True, f"Successfully cloned repository to '{target_dir}'"
    except subprocess.CalledProcessError as e:
        return False, f"Error cloning repository: {e.stderr.decode('utf-8')}"

def main():
    """Main function to run the script."""
    repo_url = "https://github.com/KHUDOYDOD/FinancialFortress.git"
    
    print("Financial Fortress Downloader")
    print("-----------------------------")
    print(f"Repository: {repo_url}")
    print()
    
    # Check if Git is installed
    if not check_git_installed():
        print("Error: Git is not installed or not in PATH.")
        print("Please install Git before running this script.")
        sys.exit(1)
    
    # Use default target directory
    target_dir = None
    print("Using default target directory...")
    
    # Clone the repository
    success, message = clone_repository(repo_url, target_dir)
    print(message)
    
    if success:
        # Determine the actual target directory used
        actual_dir = target_dir if target_dir else "FinancialFortress"
        print("\nSetup completed successfully!")
        print(f"The FinancialFortress script has been downloaded to: {os.path.abspath(actual_dir)}")
        print("\nTo use the script, navigate to the directory:")
        print(f"  cd {actual_dir}")
    else:
        print("\nSetup failed. Please check the error message above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
