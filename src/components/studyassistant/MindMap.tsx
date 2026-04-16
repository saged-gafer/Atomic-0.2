"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface Node {
  name: string;
  children?: Node[];
}

interface MindMapProps {
  data: string; // JSON string
  color: string;
}

export default function MindMap({ data, color }: MindMapProps) {
  let root: Node;
  try {
    root = JSON.parse(data);
  } catch {
    return <div className="text-red-500">Invalid Mind Map data</div>;
  }

  return (
    <div className="p-8 bg-card rounded-2xl border border-muted overflow-x-auto min-h-[400px] flex items-center justify-center">
      <div className="relative flex flex-col items-center gap-16">
        {/* Root Node */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="z-10 px-6 py-3 rounded-2xl shadow-lg font-bold text-white relative"
          style={{ backgroundColor: color }}
        >
          {root.name}
        </motion.div>

        {/* Children Row */}
        <div className="flex gap-8 items-start relative">
          {(root.children || []).map((child, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex flex-col items-center gap-8 relative"
            >
              {/* Connector line from root */}
              <div
                className="absolute -top-16 w-px bg-muted"
                style={{ height: '64px' }}
              />

              <div
                className="px-4 py-2 rounded-xl border-2 font-semibold text-sm bg-card shadow-sm z-10"
                style={{ borderColor: color, color: color }}
              >
                {child.name}
              </div>

              {/* Grandchildren Column */}
              <div className="flex flex-col gap-3">
                {(child.children || []).map((gChild, j) => (
                  <motion.div
                    key={j}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 + j * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color + '80' }} />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{gChild.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
