ChemCanvasJS
============

The development of a free (MIT licensed) tool for drawing molecules and reactions.

Please note that this tool is being developed as we speak and currently I am the only developer so if you install the scripts be prepared to find that there are things unimplemented. See the a short summary of features as yet to be implemented:

1. Triple bonds are not yet implemented (this is trivial by comparison, I have been busy with other stuff).
2. Implicit Hs on hetereoatoms are not added automatically (although they are acounting for when making calculations)
3. Drawing from a hetereoatom is not yet implemented
4. The ring tools needs various improvements, for example, adding a ring at the end of a chain is not yet implemented.


Things that are implemented that you might find useful (some may not be yet available):

1. Import mol files from your computer and smiles string.
2. Export mol file (the first molecule only if various molecules are drawn) and smiles string representation of the molecule.
3. Exporting SVG nodes. ChemCanvas is able to import these svgs as the molecules that they were which can be useful in cases were you need to support editing.
4. Print the whole drawing at the maximum resolution of your printer (SVG printing).
5. Fully interactive periodic table.
6. ChemCanvas is able to find stereogenic centers and assign them R or S descriptors according to the CIP Rules. Although the algorithm is already written and extensivelly tested in its ability to correctly assign priorities(see CIP Rules in wikipedia) there are minor final issues to take care of still. Please note that rules 5 of the CIP Rules which mainly deal with pseudo-chirality is not taken into acount in the present implementation.  

![ChemCanvas screenshot](/chemcanvas.png "ChemCanvas screenshot")


