"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { useDims, useWindowSize } from "@/hooks";
import { SkillGroups } from "@/types";

import styles from "./styles.module.scss";

/**
 * SVG here is broken into xUnits
 * The first 3 is where the label for the skill goes.
 **/
const textOffset = 3;

export function SkillsGraph({ skillGroups }: { skillGroups: SkillGroups }) {
  const [ref, dims] = useDims<HTMLDivElement>();
  const winSize = useWindowSize();
  const [tooltip, setTooltip] = useState({ top: 0, left: 0 });

  const [description, setDescription] = useState("");
  const [skillTitle, setSkillTitle] = useState("");

  const xUnit = Math.min(dims.width / 10, 116);
  const isMobile = winSize.width < 768;

  return (
    <div className={styles.outerContainer} ref={ref}>
      {skillGroups.map(({ groupName, groupDescription, skills }, idx1) => (
        <div className={styles.innerContainer} key={idx1}>
          <h2 className={styles.catName}>{groupName}</h2>
          {groupDescription && <p>{groupDescription}</p>}
          {/* Tooltip */}
          <div
            style={{ top: tooltip.top, left: tooltip.left }}
            className={styles.descrip}
            id={`descrip_${idx1}`}
          >
            {isMobile && (
              <>
                <div
                  className={styles.toolTipCloseIcon}
                  onClick={() => {
                    const element = document.getElementById(`descrip_${idx1}`);
                    if (element !== null) {
                      element.style.opacity = "0";
                      element.style.pointerEvents = "none";
                    }
                  }}
                >
                  x
                </div>
                <h3>{skillTitle}</h3>
              </>
            )}
            <p>{description}</p>
          </div>
          {/* Plot the axes and labels first */}
          {/* Then plot each bar individually */}
          <svg className={styles.svg} height={(skills.length + 1) * 65 - 5}>
            <text
              y={30}
              x={textOffset * xUnit - 5}
              className={styles.text}
              dominantBaseline="middle"
            >
              Beginner
            </text>
            <text
              y={30}
              x={textOffset * xUnit + 5 * xUnit}
              className={styles.text}
              dominantBaseline="middle"
              textAnchor="end"
            >
              Intermediate
            </text>
            <line
              x1={textOffset * xUnit - 5}
              x2={textOffset * xUnit - 5}
              y1={65}
              y2={65 * (skills.length + 1) - 5}
              className={styles.divider}
            />
            {new Array(6).fill(undefined).map((_, idx2) => (
              <line
                key={idx2}
                x1={textOffset * xUnit + idx2 * xUnit}
                x2={textOffset * xUnit + idx2 * xUnit}
                y1={65}
                y2={65 * (skills.length + 1) - 5}
                className={styles.graphLine}
              />
            ))}
            {/* Add the description as a drop down or tick box thing/ hover state for desktop (try to not repeat dom)*/}
            {skills.map(({ title, description, value }, idx2) => {
              return (
                <g
                  key={idx2}
                  onMouseEnter={(e) => {
                    const element = document.getElementById(`descrip_${idx1}`);
                    if (element !== null) {
                      element.style.opacity = "1";
                      setDescription(description);
                      setSkillTitle(title);
                      if (!isMobile) {
                        let bounds = ref.current?.getBoundingClientRect();
                        setTooltip({
                          top: e.pageY - 160,
                          left: e.clientX - (bounds?.left ?? 0)
                        });
                      } else {
                        setTooltip({ top: e.pageY - 200, left: 0 });
                      }
                    }
                  }}
                  onMouseMove={(e) => {
                    if (!isMobile) {
                      let bounds = ref.current?.getBoundingClientRect();
                      setTooltip({
                        top: e.pageY - 160,
                        left: e.clientX - (bounds?.left ?? 0)
                      });
                    } else {
                      setTooltip({ top: e.pageY - 200, left: 0 });
                    }
                  }}
                  onMouseLeave={() => {
                    const element = document.getElementById(`descrip_${idx1}`);
                    if (element !== null) {
                      element.style.opacity = "0";
                    }
                  }}
                >
                  <text
                    y={(idx2 + 1) * 65 + 30}
                    x={xUnit * (textOffset - 0.5)}
                    className={styles.text}
                    textAnchor="end"
                  >
                    {title}
                  </text>
                  <motion.rect
                    key={idx2}
                    className={styles[`bar_${idx1 % 4}`]}
                    x={textOffset * xUnit}
                    y={(idx2 + 1) * 65}
                    height={60}
                    initial={"hidden"}
                    animate={"visible"}
                    variants={{
                      hidden: {
                        width: 0
                      },
                      visible: {
                        width: value * xUnit,
                        transition: {
                          ease: "easeInOut",
                          duration: 0.5,
                          delay: 0.5 + 0.1 * idx2
                        }
                      }
                    }}
                  ></motion.rect>
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + 0.1 * idx2, duration: 0.5 }}
                    y={(idx2 + 1) * 65 + 30}
                    x={xUnit * 3.1}
                    className={styles.text}
                    dominantBaseline="middle"
                  >
                    {value}/5
                  </motion.text>
                </g>
              );
            })}
          </svg>
        </div>
      ))}
    </div>
  );
}
