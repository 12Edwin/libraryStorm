import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Index.css'
import { motion } from "framer-motion";
import image from './indexIcon.svg'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Index = () => {

    const navigation = useNavigate();

    const onStart = () =>{
        navigation('/login');
    }

    return(
        <div className="container">
      <motion.div
        className="content"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h1 className="title">Bienvenido a LibraryStorm</h1>
        <p className="description">
          El lugar donde la lectura prevalece
        </p>
        <button onClick={onStart} style={{backgroundColor:'#6aaaea', color:'whitesmoke'}} className="btn">
          Empezar <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </motion.div>
      <motion.div
        className="illustration"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Imagen o ilustración con animación */}
        <motion.img
          src={image}
          alt="Ilustración"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
    )
}