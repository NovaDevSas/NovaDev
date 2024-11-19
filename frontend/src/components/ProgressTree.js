import React from 'react';
import '../styles/progressTree.css';
import sapling from '../images/progress/sapling.png';
import seed from '../images/progress/seed.png';
import tree from '../images/progress/tree.png';
import youngTree from '../images/progress/young_tree.png';

const ProgressTree = ({ progress }) => {
    let treeImage;
    if (progress >= 75) {
        treeImage = tree;
    } else if (progress >= 50) {
        treeImage = youngTree;
    } else if (progress >= 25) {
        treeImage = sapling;
    } else {
        treeImage = seed;
    }

    return (
        <div className="progress-tree">
            <img src={treeImage} alt="Progreso del árbol" className="tree-image" />
            <p>Progreso: {progress}%</p>
        </div>
    );
};

export default ProgressTree;
