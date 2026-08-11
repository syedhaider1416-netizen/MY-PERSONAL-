export function NodeGraphStatic() {
  const nodes: Array<[number, number]> = [
    [40, 90], [40, 200], [40, 310],
    [190, 60], [190, 160], [190, 260], [190, 350],
    [340, 100], [340, 210], [340, 320],
    [480, 140], [480, 280],
  ];

  const edges: Array<[number, number]> = [
    [0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6],
    [3, 7], [4, 7], [4, 8], [5, 8], [5, 9], [6, 9],
    [7, 10], [8, 10], [8, 11], [9, 11],
  ];

  return (
    <svg
      viewBox="0 0 520 400"
      className="h-full w-full"
      aria-hidden="true"
      role="presentation"
    >
      <g stroke="#1c3a56" strokeWidth="1.5" fill="none">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
          />
        ))}
      </g>
      <g>
        {edges.slice(0, 5).map(([a, b], i) => {
          const x1 = nodes[a][0];
          const y1 = nodes[a][1];
          const x2 = nodes[b][0];
          const y2 = nodes[b][1];
          return (
            <circle key={i} r="3" fill="#6df2df">
              <animateMotion
                dur={`${3 + i}s`}
                repeatCount="indefinite"
                path={`M${x1},${y1} L${x2},${y2}`}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur={`${3 + i}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </g>
      <g fill="#29c8b0">
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" opacity="0.9" />
        ))}
      </g>
      <g fill="#29c8b0" opacity="0.12">
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="14" />
        ))}
      </g>
    </svg>
  );
}
