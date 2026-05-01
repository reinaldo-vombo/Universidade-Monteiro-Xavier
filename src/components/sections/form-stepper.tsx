import React, { useState } from 'react'
import FormStep from '../layout/form-step';
import StudentRegistration from '../../forms/student-registration';
import { TDepartemant } from '../../types';
import PaymentForm from '../../forms/payment';
import FormPaymentUi from './form-payment-ui';

type TProps = {
   candidate: any
   department: TDepartemant
}

const FormStepper = ({ candidate, department }: TProps) => {
   const [currentForm, setCurrentForm] = useState(1);
   const [isFormField, setIsFormField] = useState(false)
   const formSetps = [
      {
         id: 1,
         title: 'Informações pessoais',
         description: 'Preencha cuidadosamente o formulario com os seus dados pessoais',
         form: <StudentRegistration data={candidate.data} departmentId={department.id} />,
         descriptionUi: null
      },
      {
         id: 2,
         title: 'Informações do curso',
         description: 'Selecione o curso e turno no qual predendende cursar',
         form: <Hello />,
         descriptionUi: null
      },
      {
         id: 3,
         title: 'Pagamento',
         description: 'Termine o registro com pagamento',
         form: <PaymentForm paymentId='ddd' studentId='ddddd' />,
         descriptionUi: <FormPaymentUi />
      }
   ]
   return (
      <FormStep
         formItems={formSetps}
         isFormField={isFormField}
         currentFormIdx={currentForm}
         setCurrentForm={setCurrentForm}
      />
   )
}

export default FormStepper;
function Hello() {
   return (
      <div>
         htm
      </div>
   )
}