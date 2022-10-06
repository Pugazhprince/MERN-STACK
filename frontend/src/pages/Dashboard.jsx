import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";

function Dashboard() {
  const dispatch = useDispatch();

  //User
  const { user } = useSelector((state) => state.auth);

  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const data = jwt_decode(user.token);
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && data.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
    </>
  );
}

export default Dashboard;
