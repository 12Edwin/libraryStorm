import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { AuthContext } from "../../../auth/context/AuthContext";
import { createRequest } from "../../helpers/createRequest";
import { useSpring, animated } from 'react-spring';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill1Wave, faMoneyBillAlt, faMoneyCheckDollar, faUpload } from '@fortawesome/free-solid-svg-icons'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import image from '../../../assets/img/book.jpg'

import "./BuyBook.css";

import { MDBBtn } from "mdb-react-ui-kit";
import { createSale } from "../../helpers/createSale";

export const BuyBookComponent = ({ data, open }) => {


  const onError = () => {
    Swal.fire({
      icon: 'error',
      title: 'Upss ocurrió un error!',
      text: 'Ocurrió un error al realizar la transacción'
    });
  }

  const onSuccess = () => {
    Swal.fire({
      icon: 'success',
      title: 'Tarea completada!',
      text: '¡Felicidades, tu pago se ha realizado con éxito!'
    }).then(() => window.location.reload());
  }

  const onBookSale = async (pay) => {
    const { name, price } = data;
    const response = await createSale({ pay, book: name, price });
    console.log(response);
    if (response == 'ERROR') {
      onError()
    } else {
      onSuccess()
    }
  }

  useEffect(() => {
    handleModalOpen(data)
  }, []);

  const handleModalOpen = (book) => {
    // Configurar el modal con SweetAlert2
    Swal.fire({
      title: 'Realizar transacción',
      width: 800,
      padding: 10,
      html:
        `
      <div style="padding:15px">
      <div class="row">
        <div class="col-6">
          <div style="" class="carta">
            <div  style="max-width: 100%; height:320px">
              <img  src="${book.img || image}" class="carta-image" style="width:200px"/>
            </div>
            <div>
                <h5 class="card-title">Special title treatment</h5>
              </div>
          </div>
        </div>
        <div class="col-6">
          <div class="carta">
            <div style="padding:20px">
              <h5 class="card-title">${book.name}</h5>
            </div>
          </div>
          <div class="carta">
            <div style="padding:20px; text-align:left">
              <h6>Author:       ${book.author}</h6>
              <h6>Publication:  ${book.publication}</h6>
              <h6>Category:     ${book.category.name}</h6>
              <h6>Price:        ${book.price}</h6>
            </div>
          </div>
          <div class="carta">
            <div style="padding:20px">
              <h5 class="card-title">Special title treatment</h5>
              <input type="number" value="${ 0 }" placeholder="Monto" id="swal-input1" class="form-control swal-input" required>
            </div>
          </div>
        </div>
      </div>
      </div>
      `,
      focusConfirm: false,
      preConfirm: async() => {
        // Obtener los valores de los inputs al hacer clic en "Aceptar"
        const value = document.getElementById('swal-input1').value;
          if (!value) {
            Swal.showValidationMessage('Por favor, introduce un valor.');
            return false;
          }
          if (value < book.price) {
            Swal.showValidationMessage('Dinero insuficiente.');
            return false;
          }
          onBookSale(value);

          open(false);
      },
      showCancelButton: true,
      confirmButtonText: `Pagar  $${book.price}`,
      cancelButtonText: 'Cancelar',
      allowOutsideClick: () => !Swal.isLoading(),
      customClass: {
        confirmButton: 'btn-confirm',
        cancelButton: 'btn-cancel',
      },
      didClose: () => open(false) ,
      didOpen: () => {
        // Añadir animación de entrada con react-spring
        const modal = document.querySelector('.swal2-modal');
        const overlay = document.querySelector('.swal2-overlay');
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const modalProps = useSpring({
          from: { transform: 'translate3d(0,-50px,0)', opacity: 0 },
          to: { transform: 'translate3d(0,0,0)', opacity: 1 },
        });
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const overlayProps = useSpring({
          from: { opacity: 0 },
          to: { opacity: 1 },
        });
        modal.style.setProperty('animation', 'none');
        overlay.style.setProperty('animation', 'none');
        modalProps.start({}).then(() => {
          modal.style.removeProperty('animation');
        });
        overlayProps.start({}).then(() => {
          overlay.style.removeProperty('animation');
        });
      },
    }).then(async(result) => {
      // Si el usuario hizo clic en "Aceptar", ejecutar la transacción
      if (result.isConfirmed) {
        
      }
    });
  };



  return (
    <></>
  );
}
