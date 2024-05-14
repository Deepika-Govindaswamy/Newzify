import React, {useState} from 'react'
import Navbar from './components/Navbar.js'
import News from './components/News.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

export default function App () {

  const apiKey = process.env.REACT_APP_NEWS_API
  const pageSize = 12

  const [progress, setProgress] = useState(0)
  
  const setTopProgress = (progress) => {
    setProgress(progress)
  }

    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
            height={4}
            color='#B1C9EF'
            progress={progress}
          />
          <Routes>
            <Route exact path='/' element={<News setProgress={setTopProgress} apiKey = {apiKey}  key='home' pageSize={pageSize} country='in' category='general'/>}/>
            <Route exact path='/general' element={<News setProgress={setTopProgress} apiKey = {apiKey} key='general' pageSize={pageSize} country='in' category='general'/>}/>
            <Route exact path='/business' element={<News setProgress={setTopProgress} apiKey = {apiKey} key='business' pageSize={pageSize} country='in' category='business'/>} />
            <Route exact path='/science' element={<News setProgress={setTopProgress} apiKey = {apiKey} key='science' pageSize={pageSize} country='in' category='science'/>} />
            <Route exact path='/sports' element={<News setProgress={setTopProgress} apiKey = {apiKey} key='sports' pageSize={pageSize} country='in' category='sports'/>} />
            <Route exact path='/health' element={<News setProgress={setTopProgress} apiKey = {apiKey} key='health' pageSize={pageSize} country='in' category='health'/>} />
            <Route exact path='/entertainment' element={<News setProgress={setTopProgress} apiKey = {apiKey} key='entertainment' pageSize={pageSize} country='in' category='entertainment'/>} />
          </Routes>
        </Router>
        
      </div>
    )
  
}
