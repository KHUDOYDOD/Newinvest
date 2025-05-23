#!/usr/bin/env python3
"""
Setup script to clone and install the Invest repository
"""
import os
import sys
import subprocess
import shutil
from pathlib import Path

def run_command(command, cwd=None, check=True):
    """Run a command and return the result"""
    print(f"Running: {command}")
    try:
        result = subprocess.run(
            command,
            shell=True,
            cwd=cwd,
            check=check,
            capture_output=True,
            text=True
        )
        if result.stdout:
            print(result.stdout)
        return result
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {command}")
        print(f"Error output: {e.stderr}")
        if check:
            raise
        return e

def check_git_installed():
    """Check if git is installed"""
    try:
        subprocess.run(["git", "--version"], check=True, capture_output=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def install_git():
    """Install git if not available"""
    print("Git not found, attempting to install...")
    try:
        # Try to install git using apt (common in Linux containers)
        run_command("apt-get update && apt-get install -y git")
        return True
    except:
        try:
            # Try alternative package managers
            run_command("yum install -y git")
            return True
        except:
            print("Could not install git automatically. Please install git manually.")
            return False

def clone_repository():
    """Clone the Invest repository"""
    repo_url = "https://github.com/KHUDOYDOD/Invest.git"
    target_dir = "Invest"
    
    # Remove existing directory if it exists
    if os.path.exists(target_dir):
        print(f"Removing existing {target_dir} directory...")
        shutil.rmtree(target_dir)
    
    print(f"Cloning repository from {repo_url}...")
    try:
        run_command(f"git clone {repo_url}")
        return True
    except subprocess.CalledProcessError:
        print("Failed to clone repository. Checking if directory exists...")
        return os.path.exists(target_dir)

def install_python_dependencies(project_dir):
    """Install Python dependencies"""
    requirements_files = [
        "requirements.txt",
        "requirements-dev.txt",
        "requirements.pip",
        "pyproject.toml",
        "setup.py"
    ]
    
    installed = False
    
    for req_file in requirements_files:
        req_path = os.path.join(project_dir, req_file)
        if os.path.exists(req_path):
            print(f"Found {req_file}, installing dependencies...")
            try:
                if req_file == "requirements.txt":
                    run_command(f"pip install -r {req_file}", cwd=project_dir)
                    installed = True
                elif req_file == "pyproject.toml":
                    run_command("pip install .", cwd=project_dir)
                    installed = True
                elif req_file == "setup.py":
                    run_command("pip install -e .", cwd=project_dir)
                    installed = True
                break
            except subprocess.CalledProcessError as e:
                print(f"Failed to install dependencies from {req_file}: {e}")
                continue
    
    if not installed:
        print("No requirements file found or installation failed.")
        print("Attempting to install common dependencies...")
        try:
            # Install common packages that might be needed
            common_packages = [
                "requests",
                "beautifulsoup4",
                "pandas",
                "numpy",
                "matplotlib",
                "seaborn",
                "flask",
                "fastapi",
                "streamlit"
            ]
            run_command(f"pip install {' '.join(common_packages)}", check=False)
        except:
            print("Could not install common packages.")
    
    return installed

def setup_environment():
    """Set up the environment for the project"""
    print("Setting up environment...")
    
    # Upgrade pip
    try:
        run_command("pip install --upgrade pip")
    except:
        print("Could not upgrade pip")
    
    # Install wheel for better package installation
    try:
        run_command("pip install wheel")
    except:
        print("Could not install wheel")

def find_main_script(project_dir):
    """Find the main script to run"""
    possible_main_files = [
        "main.py",
        "app.py",
        "run.py",
        "start.py",
        "server.py",
        "invest.py",
        "__main__.py"
    ]
    
    for main_file in possible_main_files:
        main_path = os.path.join(project_dir, main_file)
        if os.path.exists(main_path):
            return main_file
    
    # Look for Python files in the root directory
    python_files = [f for f in os.listdir(project_dir) if f.endswith('.py')]
    if python_files:
        return python_files[0]  # Return the first Python file found
    
    return None

def main():
    """Main setup function"""
    print("=" * 50)
    print("Invest Repository Setup Script")
    print("=" * 50)
    
    # Check if git is installed
    if not check_git_installed():
        if not install_git():
            print("Error: Git is required but could not be installed.")
            sys.exit(1)
    
    # Set up environment
    setup_environment()
    
    # Clone repository
    if not clone_repository():
        print("Error: Failed to clone repository.")
        sys.exit(1)
    
    project_dir = "Invest"
    
    # Install dependencies
    print("Installing dependencies...")
    install_python_dependencies(project_dir)
    
    # Find main script
    main_script = find_main_script(project_dir)
    if main_script:
        print(f"Found main script: {main_script}")
        
        # Create a simple runner script
        runner_content = f"""#!/usr/bin/env python3
import os
import sys

# Change to the Invest directory
os.chdir('Invest')

# Add the Invest directory to Python path
sys.path.insert(0, '.')

# Run the main script
if __name__ == "__main__":
    exec(open('{main_script}').read())
"""
        
        with open("run_invest.py", "w") as f:
            f.write(runner_content)
        
        print(f"Created run_invest.py to execute {main_script}")
        print("You can now run: python run_invest.py")
    else:
        print("Could not find a main script to run.")
        print("Please check the Invest directory and run the appropriate script manually.")
    
    print("=" * 50)
    print("Setup completed!")
    print("=" * 50)
    
    # List contents of the cloned directory
    if os.path.exists(project_dir):
        print(f"\nContents of {project_dir}:")
        try:
            for item in os.listdir(project_dir):
                item_path = os.path.join(project_dir, item)
                if os.path.isdir(item_path):
                    print(f"  📁 {item}/")
                else:
                    print(f"  📄 {item}")
        except:
            print("Could not list directory contents")

if __name__ == "__main__":
    main()
