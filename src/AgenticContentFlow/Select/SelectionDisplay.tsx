import { Edge, Node, Panel, useOnSelectionChange } from "@xyflow/react";
import { useCallback, useState } from "react";
import { useNodeContext } from "../Node/store/useNodeContext";

function SelectionDisplay() {
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [selectedEdges, setSelectedEdges] = useState<string[]>([]);
  const { nodeParentIdMapWithChildIdSet } = useNodeContext();

  // the passed handler has to be memoized, otherwise the hook will not work correctly
  const onChange = useCallback(
    ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => {
      setSelectedNodes(nodes.map((node) => node.id));
      setSelectedEdges(edges.map((edge) => edge.id));
    },
    []
  );

  useOnSelectionChange({
    onChange,
  });

  //Is parent
  const isPotentialParent = (nodeId: string) => {
    return nodeParentIdMapWithChildIdSet.has(nodeId)

  };

  return (
    <Panel position="bottom-left" style={{ padding: 10 }}>
      <p>Selected nodes: {selectedNodes.join(", ")}</p>
      <p>Selected edges: {selectedEdges.join(", ")}</p>
      <p>
        First Is potential parent: {JSON.stringify(isPotentialParent(selectedNodes[0]))}
      </p>

    </Panel>
  );
}

export default SelectionDisplay;
