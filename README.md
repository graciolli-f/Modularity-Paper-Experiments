# Experiment Code

This repository contains experimental code discussed in the position paper [The Modular Imperative: Rethinking LLMs for Maintainable Software](https://doi.org/10.1145/3759425.3763392) by Anastasiya Kravchuk-Kirilyuk, Fernanda Graciolli, and Nada Amin. 

## Project Overview

The experiments investigate how different development methodologies affect code modularity, maintainability, and architectural quality. The project compares:

- **prompt-only** or **baseline**: Direct implementation without architectural guidance from Rubric DSL
- **with-rubric**: Implementation guided by architectural specifications and constraints via Rubric files

## Experiment Mapping

The following table maps the experiment sections from the paper to the corresponding directories in this repository:

| Paper Section | Experiment Description | Repository Location |
|---------------|------------------------|-------------------|
| **4.1** | Modular Code from Scratch | `from-scratch/` |
| **4.2.1** | Porting Code Base to React | `porting/` |
| **4.2.2** | Targeted Edits | `targeted-edits/` |
| **4.2.2 - Experiment 1** | Simple intra-module edit | `targeted-edits/run1/after-exp-1`, `targeted-edits/run2/after-exp-1` |
| **4.2.2 - Experiment 2** | Complex intra-module edit | `targeted-edits/run1/after-exp-2`, `targeted-edits/run2/after-exp-2` |
| **4.2.2 - Experiment 2a**: | Add constraints | `targeted-edits/run1/after-exp-2a`, `targeted-edits/run2/after-exp-2a` |
| **4.2.2 - Experiment 3** | Architectural recognition | `targeted-edits/run1/after-exp-3`, `targeted-edits/run2/after-exp-3` |
| **4.2.2 - Experiment 4** | Module integration | `targeted-edits/run1/after-exp-4`, `targeted-edits/run2/after-exp-4` |

**Note**: Code is in the process of being added to directories. Some directories outlined above may not be complete.  

## Repository Structure

### Core Experiments

#### From Scratch Development (Section 4.1)
- `from-scratch/prompt-only/` - Implementation without architectural guidance
- `from-scratch/with-rubric/` - Implementation with Rubric v0.1.0

#### Porting Experiments (Section 4.2.1)
- `porting/prompt-only/` - Porting existing code without architectural guidance
- `porting/with-rubric/` - Porting with architectural rubrics

#### Targeted Edits (Section 4.2.2)
- `targeted-edits/run1/` - First experimental run
- `targeted-edits/run2/` - Second experimental run

**Note**: The targeted-edits experiments used different Rubric versions:
- **Run 1**: Rubric v0.1.0
- **Run 2**: Rubric v1.0.0 (includes validation)


## Contributing

[placeholder]

## License

[placeholder]

