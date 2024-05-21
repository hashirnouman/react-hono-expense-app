import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { hc } from 'hono/client'
import { type ApiRoutes } from '../../server/app'
function App() {
	const [count, setCount] = useState(0);
	const [totalExpense, setTotalExpense] = useState(0);
	const client = hc<ApiRoutes>('/')
	useEffect(() => {
		const fetchTotalExpense = async () => {
			const response = await client.api.expenses['total-expenses'].$get()
			const data = await response.json();
			setTotalExpense(data.total);
		}
		fetchTotalExpense();
	}, [])
	return (
		<>
			<h1>Vite + React</h1>
			<div className="card">
				<Button type="button" onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</Button>


				{totalExpense}
			</div>
		</>
	);
}

export default App;
