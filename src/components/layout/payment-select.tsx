import React, { useState } from 'react'
import { TAcademicFaculty, TBankAccounte } from '../../types'
import Accounts from './accounts';
import { PaymentCard } from './payment-card';
type TProps = {
   accounts: TBankAccounte[] | undefined;
   academicFculty: TAcademicFaculty | undefined
   exameId: string | undefined
}
const PAYMENT_TYPE = ['INVOICE', 'REFERENCE', 'QR']
const PaymentSelect = ({ academicFculty, accounts, exameId }: TProps) => {

   const [selectedAccount, setselectedAccount] = useState<TBankAccounte | null>(null)
   const onchange = (account: TBankAccounte) => {
      setselectedAccount(account)
   }
   return (
      <div className="grid grid-cols-12">
         <div className="flex gap-6 flex-wrap col-span-9">
            {PAYMENT_TYPE.map((type) => {
               const isDisabled =
                  !exameId || selectedAccount === null || type === "REFERENCE" || type === "QR";

               return (
                  <div className="h-12">
                     <PaymentCard
                        key={type}
                        selectedAccount={selectedAccount}
                        type={type}
                        data={academicFculty}
                        disabled={isDisabled}
                     />

                  </div>
               );
            })}
         </div>
         <Accounts accounts={accounts} onchange={onchange} selectedAccount={selectedAccount} />
      </div>
   )
}

export default PaymentSelect
