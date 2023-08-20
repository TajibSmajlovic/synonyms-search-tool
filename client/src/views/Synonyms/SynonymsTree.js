import styled from 'styled-components';

import { If } from 'components';
import { generateId } from 'utils/helpers';
import { useGetSynonymsTree } from './api/useGetSynonymsTree';

const renderTree = (synonyms) =>
  Object.keys(synonyms).map((word) => {
    const wordSynonyms = synonyms[word];

    return (
      <TreeItem key={`${generateId()}.${Math.random()}`}>
        <TreeNode>{word}</TreeNode>
        <If predicate={Boolean(Object.keys(wordSynonyms).length)}>
          <Tree>{renderTree(wordSynonyms)}</Tree>
        </If>
      </TreeItem>
    );
  });

// https://medium.com/@ross.angus/sitemaps-and-dom-structure-from-nested-unordered-lists-eab2b02950cf
const SynonymsTree = ({ word }) => {
  const { synonyms } = useGetSynonymsTree(word);

  if (!synonyms?.tree) return null;
  if (!Boolean(Object.keys(synonyms.tree).length)) return null;

  const tree = { [synonyms.word]: synonyms.tree };

  return (
    <Wrapper data-testid="synonyms-tree">
      <Tree className="root">{renderTree(tree)}</Tree>
    </Wrapper>
  );
};

//#region Styles
const Wrapper = styled.div`
  width: 100%;
  padding: 1.5rem;
  overflow: auto;
`;

const TreeItem = styled.li`
  display: table-cell;
  padding-block: 0.5rem;
  position: relative;

  &:before {
    content: '';
    left: 0;
    right: 0;
    top: 0;
    outline: var(--line);
    position: absolute;
  }

  &:first-child:before {
    left: 50%;
  }

  &:last-child:before {
    right: 50%;
  }
`;

const TreeNode = styled.code`
  border-radius: 3px;
  display: inline-block;
  margin: 1rem 0.2rem 1.5rem;
  padding: 0.3rem 0.6rem;
  position: relative;
  white-space: nowrap;
  border: 2px solid var(--gray_400);

  &:before {
    outline: var(--line);
    content: '';
    height: 1.5rem;
    left: 50%;
    position: absolute;
    top: -1.55rem;
  }
`;

const Tree = styled.ul`
  font-size: 1.3rem;
  margin: 0;
  padding: 0;
  position: relative;
  text-align: center;
  display: table;
  width: 100%;
  color: var(--gray_700);

  --line: 1px solid var(--gray_400);

  &:before {
    content: '';
    position: absolute;
    outline: var(--line);
    height: 1.5rem;
    top: -1.5rem;
    left: 50%;
  }

  /* removing line from root node */
  &.root {
    overflow: hidden;

    & > ${TreeItem} {
      padding: 0;
      margin: 0;

      & > ${TreeNode} {
        margin-top: 0;
      }
    }
  }
`;
//#endregion Styles

export default SynonymsTree;
