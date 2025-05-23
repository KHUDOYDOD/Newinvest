# Invest Project Setup

This setup automatically downloads and configures the Invest script from the GitHub repository without any modifications.

## Repository
- **Source**: https://github.com/KHUDOYDOD/Invest.git
- **Setup**: Automated cloning and dependency installation
- **Execution**: Original functionality preserved

## Quick Start

1. **Run the setup and execute the project**:
   ```bash
   python run.py
   ```

2. **Or run setup separately**:
   ```bash
   python setup.py
   ```

## What the Setup Does

1. **Checks and installs Git** if not available
2. **Clones the repository** from GitHub
3. **Installs dependencies** automatically by detecting:
   - requirements.txt
   - pyproject.toml
   - setup.py files
4. **Identifies the main script** to run
5. **Creates a runner script** for easy execution

## Manual Execution

If automatic execution fails, you can run the project manually:

```bash
cd Invest
python main.py  # or whatever the main script is called
