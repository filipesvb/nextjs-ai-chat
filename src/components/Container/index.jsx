import styles from "./container.module.css";

export const Container = ({ children }) => {
  return (
    <main className={`${styles.container} p-4 rounded-xl shadow-2xl relative`}>
      <div className="absolute top-0 left-0 w-full h-full  backdrop-blur-[4px] -z-1 rounded-xl"></div>
      {children}
    </main>
  );
};
