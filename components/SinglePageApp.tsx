import {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { CenterProps } from "@mantine/core";
import CenteredBox from "./general/FullHeightCenter";
import { AStarFinder } from "astar-typescript";
import { css } from "styled-components";

type Props = {
  // Component props here
} & Omit<ComponentPropsWithoutRef<"div"> & CenterProps, "children">;

type Coordinate = { x: number; y: number };
type Go = ".";
type No = ".";
type Position = "@";
type Goal = "$";
type Cell = Go | No | Position | Goal;
type CellMap = Cell[][];
type WalkableMap = number[][];

/**
 * Do a nested find to get the coordinates of an unique "@"
 */
function getPosition(map: CellMap): Coordinate {
  const position = map.find((row) => row.includes("@"));
  if (!position) throw new Error("No position found");
  const x = position.indexOf("@");
  const y = map.indexOf(position);
  return {
    x,
    y,
  };
}

function getGoalPositions(map: CellMap): Coordinate[] {
  const goalPositions: Coordinate[] = [];
  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === "$") goalPositions.push({ x, y });
    });
  });
  return goalPositions;
}

// function getAllNavigatableCells(map: Map): Coordinate[] {
//   const navigationables: Coordinate[] = [];
//   map.forEach((row, x) => {
//     row.forEach((cell, y) => {
//       if (cell === "." || cell === "$") navigationables.push([x, y]);
//     });
//   });
//   return navigationables;
// }

// function getNextPossibleMoves(
//   map: Map,
//   position: Coordinate,
//   navigationables: Coordinate[]
// ): Coordinate[] {
//   const [x, y] = position;
//   const possibleMoves: Coordinate[] = [];
//   if (navigationables.includes([x + 1, y])) {
//     possibleMoves.push([x + 1, y]);
//   }
//   if (navigationables.includes([x - 1, y])) {
//     possibleMoves.push([x - 1, y]);
//   }
//   if (navigationables.includes([x, y + 1])) {
//     possibleMoves.push([x, y + 1]);
//   }
//   if (navigationables.includes([x, y - 1])) {
//     possibleMoves.push([x, y - 1]);
//   }
//   return possibleMoves;
// }

/**
 * Find the quickest path to reach all goals
 *
 * Use the fastest pathfinding algorithm available, which is probably A*, recursively
 */
function getQuickestPath(map: CellMap): number[][] {
  const walkableMap = map.map((row) =>
    row.map((cell) => walkableConversion[cell])
  );

  let positionInitial = getPosition(map);
  const allGoalPositions = getGoalPositions(map);
  /**
   * All ways of combining all goal positions
   */
  const allGoalCombinations = allGoalPositions.reduce(
    (acc, goalPosition) => {
      const newCombinations: Coordinate[][] = [];
      acc.forEach((combination) => {
        newCombinations.push([...combination, goalPosition]);
        newCombinations.push([goalPosition, ...combination]);
      });
      return newCombinations;
    },
    [[]] as Coordinate[][]
  );

  const allPaths: number[][][] = [];

  allGoalCombinations.forEach((combination) => {
    combination.push(positionInitial);

    let position = positionInitial;
    const routes: number[][] = [];

    combination.forEach((goal) => {
      const finder = new AStarFinder({
        diagonalAllowed: false,
        grid: {
          matrix: walkableMap,
        },
      });
      routes.push(...finder.findPath(position, goal));
      position = goal;
    });

    allPaths.push(routes);
  });

  console.log(
    "allPathLegths",
    allPaths.map((c) => c.length)
  );

  console.log("All", allPaths);

  const shortestPath = allPaths.reduce((acc, path) => {
    if (path.length < acc.length) return path;
    return acc;
  }, allPaths[0]);

  console.log("Shortest", shortestPath);

  return shortestPath;
}

const walkableConversion = {
  ".": 0,
  "@": 0,
  $: 0,
  "#": 1,
};

const pixelSize = 20;

export default forwardRef<HTMLDivElement, Props>(function SinglePageApp(
  { ...props },
  ref
) {
  const map = [
    "#########################",
    "#.......................#",
    "#.......................#",
    "#........$.###..........#",
    "#........#######........#",
    "#..........###..........#",
    "#...........#.........$.#",
    "#..###..................#",
    "#.#######.......#####...#",
    "#..#####.........######.#",
    "#.................####..#",
    "#.......................#",
    "#.......................#",
    "#.......................#",
    "##.........##....##.....#",
    "###.......####.$#####...#",
    "####.......##...###.....#",
    "######.........###......#",
    "#######........##.......#",
    "########.......##.$.....#",
    "#.............###.......#",
    "#.............##........#",
    "#.......................#",
    "#.@.....................#",
    "#########################",
  ];

  const typedMap = map.map((row) => row.split("") as Cell[]);
  const quickestRoute = getQuickestPath(typedMap);

  /**
   * Animate the quickest path
   */
  const [position, setPosition] = useState(quickestRoute[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < quickestRoute.length - 1) {
        setIndex((i) => i + 1);
      } else {
        setIndex(0);
      }
      setPosition(quickestRoute[index]);
    }, 10);
    return () => clearInterval(interval);
  }, [index]);

  // Your logic
  return (
    <CenteredBox
      ref={ref}
      {...props}
      css={css`
        font-size: ${pixelSize / 1.25}px;
      `}
    >
      {typedMap.map((row, y) => {
        return (
          <span
            key={y}
            css={css`
              display: flex;
            `}
          >
            {row.map((cell, x) => {
              const isQuickestRoute = quickestRoute.some(
                (coordinate) => coordinate[0] === x && coordinate[1] === y
              );
              const isPosition = position[0] === x && position[1] === y;
              const quickestRouteCSS = css`
                background-color: ${cell === "." ? "#b6f5ff" : "#5cdcf0"};
              `;
              const positionCSS = css`
                background-color: #ff1a5b;
              `;

              return (
                <span
                  key={[x, y].join("-")}
                  css={css`
                    width: ${pixelSize}px;
                    height: ${pixelSize}px;
                    background-color: white;
                    ${isQuickestRoute ? quickestRouteCSS : null}
                    ${isPosition ? positionCSS : null}
                  `}
                >
                  {cell}
                </span>
              );
            })}
          </span>
        );
      })}
    </CenteredBox>
  );
});
