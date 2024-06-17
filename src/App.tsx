import {  useState } from "react";
import "./App.css";
import Skeleton from '@mui/material/Skeleton';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Box, Button } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [name, setName] = useState("");


  const genAI = new GoogleGenerativeAI(
    "GEMINI_KEY"
  );
  const fetchData = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt=name


    const result = await model.generateContent(prompt);

    const response = await result.response;
    const text = response.text();
    //@ts-ignore
    setApiData(text);
    setLoading(false);
  };
  //@ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(name);
    fetchData();
  };

  return (
    <div className="container">
      <h3>Guru Gemini Ai</h3>
      <div className="mt-5 mb-5">
        <form onSubmit={handleSubmit}>
          <div className="row d-flex align-items-end">
            <div className="col-lg-2">
              <label htmlFor="name" className="form-label">
                Name{' '}
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div style={{marginTop:'20px'}}>
            {loading &&  <CircularProgress/>}

            {!loading  &&   <Button type="submit" sx={{
                alignItems:"center",
                justifyContent:"space-between",
                gap:2
              }}>
                
            Submit <SendIcon color="primary"/>
              </Button>}
            </div>

          </div>
        </form>
      </div>
      <div style={{marginTop:'20px'}}>
        {!loading && <p className="text-align-left">{apiData}</p>}
        {loading &&  
        <Box sx={{ width: 300 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>}
      </div>
    </div>
  );
}
export default App;