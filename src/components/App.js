import Header from "./Header/Header";
import Filter from "./Filter/Filter";
import Sort from "./Sort/Sort";
import Board from "./Board/Board";
import TasksList from "./TasksList/TasksList";
import SvgSprite from "./SvgSprite/SvgSprite";

const App = () => {
  return (
    <>
      <SvgSprite />
      <main className="main">
        <Header />
        <Filter />
        <Board>
          <Sort />
          <TasksList />
        </Board>
      </main>
    </>
  );
};

export default App;
