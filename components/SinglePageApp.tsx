import {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Center,
  CenterProps,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
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

/**
 * Find the quickest path to reach all goals
 *
 * Use the fastest pathfinding algorithm available, which is probably A*, recursively
 */
function getQuickestAndSlowestPath(map: CellMap): {
  quickest: number[][];
  slowest: number[][];
} {
  const walkableMap = map.map((row) =>
    row.map((cell) => walkableConversion[cell])
  );

  let positionInitial = getPosition(map);
  const allGoalPositions = getGoalPositions(map);
  /**
   * Recursively get all combinations of goals
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
      routes.push(...finder.findPath(position, goal).slice(0, -1));
      position = goal;
    });

    allPaths.push(routes);
  });

  const quickest = allPaths.reduce((acc, path) => {
    if (path.length < acc.length) return path;
    return acc;
  }, allPaths[0]);

  const slowest = allPaths.reduce((acc, path) => {
    if (path.length > acc.length) return path;
    return acc;
  }, allPaths[0]);

  return {
    quickest,
    slowest,
  };
}

const walkableConversion = {
  ".": 0,
  "@": 0,
  $: 0,
  "#": 1,
};

const pixelSize = 10;

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
  const { quickest } = getQuickestAndSlowestPath(typedMap);

  const walkingBackAndFourth = quickest.slice(0, 2);

  // Your logic
  return (
    <CenteredBox
      ref={ref}
      {...props}
      css={css`
        font-size: ${pixelSize / 1.25}px;
      `}
    >
      <Group align="center">
        <Box
          css={css`
            margin: 0 auto;
          `}
        >
          <Title>Fastest</Title>
          <SalesRoute map={typedMap} route={quickest} />
        </Box>
        <Box
          css={css`
            margin: 0 auto;
          `}
        >
          <Title>Slowest</Title>
          <SalesRoute
            map={typedMap}
            route={walkingBackAndFourth}
            minutes="&#x221E;"
          />
        </Box>
      </Group>
    </CenteredBox>
  );
});

const clickMs = 100;
const davidAmountOfChristmasFood = 3.5;

function SalesRoute({
  map,
  route,
  minutes,
}: {
  map: CellMap;
  route: number[][];
  minutes?: string;
}) {
  /**
   * Animate the route
   */
  const [position, setPosition] = useState(route[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let newIndex = index + 1;
      if (index < route.length - 1) {
        setIndex((i) => i + 1);
      } else {
        newIndex = 0;
        setIndex(0);
      }
      setPosition(route[newIndex]);
    }, clickMs);
    return () => clearInterval(interval);
  }, [index, route]);

  return (
    <>
      {map.map((row, y) => {
        return (
          <span
            key={y}
            css={css`
              display: flex;
            `}
          >
            {row.map((cell, x) => {
              const isQuickestRoute = route.some(
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
                    position: relative;
                    overflow: visible;
                  `}
                >
                  {isPosition ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/david.png"
                        alt="handsome fella"
                        css={css`
                          position: absolute;
                          /* transform: translate(-50%, -50%); */
                          max-width: ${pixelSize}px;
                          /* Scale a bit up */
                          z-index: 1;

                          /* Wobble the image slightly */
                          animation: wobble ${`0.${clickMs}`}s ease-in-out
                            infinite;
                          @keyframes wobble {
                            0% {
                              transform: scale(${davidAmountOfChristmasFood})
                                rotate(0deg);
                            }
                            25% {
                              transform: scale(${davidAmountOfChristmasFood})
                                rotate(10deg);
                            }
                            50% {
                              transform: scale(${davidAmountOfChristmasFood})
                                rotate(0deg);
                            }
                            75% {
                              transform: scale(${davidAmountOfChristmasFood})
                                rotate(-10deg);
                            }
                            100% {
                              transform: scale(${davidAmountOfChristmasFood})
                                rotate(0deg);
                            }
                          }
                        `}
                      />
                    </>
                  ) : null}
                  {cell}
                </span>
              );
            })}
          </span>
        );
      })}
      <Text size="lg">{minutes ?? route.length} minutes</Text>
    </>
  );
}
