#!/usr/bin/env python3
"""
Main runner script that sets up and runs the Invest project
"""
import os
import sys
import subprocess
from pathlib import Path

def check_setup():
    """Check if the project is already set up"""
    return os.path.exists("Invest") and os.path.isdir("Invest")

def run_setup():
    """Run the setup script"""
    print("Setting up the Invest project...")
    try:
        subprocess.run([sys.executable, "setup.py"], check=True)
        return True
    except subprocess.CalledProcessError:
        print("Setup failed!")
        return False

def run_invest():
    """Run the Invest script"""
    if not check_setup():
        print("Project not set up. Running setup first...")
        if not run_setup():
            return False
    
    # Try to run the project
    invest_dir = "Invest"
    
    # Look for common entry points
    entry_points = [
        "main.py",
        "app.py", 
        "run.py",
        "start.py",
        "server.py",
        "invest.py"
    ]
    
    for entry_point in entry_points:
        entry_path = os.path.join(invest_dir, entry_point)
        if os.path.exists(entry_path):
            print(f"Running {entry_point}...")
            try:
                # Change to the Invest directory and run the script
                os.chdir(invest_dir)
                subprocess.run([sys.executable, entry_point], check=True)
                return True
            except subprocess.CalledProcessError as e:
                print(f"Error running {entry_point}: {e}")
                os.chdir("..")  # Change back to original directory
                continue
            except KeyboardInterrupt:
                print("\nScript interrupted by user.")
                os.chdir("..")
                return True
    
    # If no entry point found, list available Python files
    print("No standard entry point found. Available Python files:")
    try:
        os.chdir(invest_dir)
        python_files = [f for f in os.listdir(".") if f.endswith('.py')]
        for i, py_file in enumerate(python_files, 1):
            print(f"  {i}. {py_file}")
        
        if python_files:
            try:
                choice = input("\nEnter the number of the file to run (or press Enter to exit): ").strip()
                if choice and choice.isdigit():
                    choice_idx = int(choice) - 1
                    if 0 <= choice_idx < len(python_files):
                        selected_file = python_files[choice_idx]
                        print(f"Running {selected_file}...")
                        subprocess.run([sys.executable, selected_file], check=True)
                        return True
            except (KeyboardInterrupt, EOFError):
                print("\nExiting...")
        
        os.chdir("..")
    except Exception as e:
        print(f"Error: {e}")
        try:
            os.chdir("..")
        except:
            pass
    
    return False

def main():
    """Main function"""
    print("Invest Project Runner")
    print("=" * 30)
    
    try:
        if not run_invest():
            print("Could not run the Invest project.")
            if os.path.exists("Invest"):
                print("You can try running files manually from the Invest directory.")
            sys.exit(1)
    except KeyboardInterrupt:
        print("\nExiting...")
        sys.exit(0)

if __name__ == "__main__":
    main()
