import { motion } from "framer-motion";

function Loading() {
  return (
    <div className="m-0 flex h-screen w-screen items-center justify-center p-0">
      <motion.div
        className="flex h-16 w-16 justify-around"
        variants={{
          start: { transition: { staggerChildren: 0.2 } },
          end: { transition: { staggerChildren: 0.2 } },
        }}
        initial="start"
        animate="end"
      >
        {[null, null, null].map((_, i) => (
          <motion.span
            className="bg-button block h-4 w-4 rounded-2xl"
            key={i}
            variants={{ start: { y: "0%" }, end: { y: "60%" } }}
            transition={{ duration: 0.4, yoyo: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default Loading;
