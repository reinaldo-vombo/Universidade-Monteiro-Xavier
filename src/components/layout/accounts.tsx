import React from 'react'
import { TBankAccounte } from '../../types'
type TProps = {
   accounts: TBankAccounte[] | undefined;
   selectedAccount: TBankAccounte | null;
   onchange: (account: TBankAccounte) => void
}

const Accounts = ({ accounts, onchange, selectedAccount }: TProps) => {
   return (
      <div className='space-y-3 col-span-3'>
         <p>Selecione umas das contas</p>
         <div className='grid gap-3'>
            {accounts && accounts?.length > 0 ? accounts?.map((account) => {
               const logo = account.bankName === 'BAI' ? '/bai-d.png' : account.bankName === 'BFA' ? '/bfa.png' : '';
               const isSelected = selectedAccount?.id === account.id;
               return (
                  <div key={account.id} className={`flex cursor-pointer items-center gap-2 p-2 ${isSelected ? 'border rounded-lg bg-white' : ''}`} onClick={() => onchange(account)}>
                     <div>
                        <img
                           src={logo}
                           width={70}
                           height={70}
                           alt={account.accountName}
                        />
                     </div>
                     <div>
                        <ul>
                           <li className='font-bold'>{account.accountName}</li>
                           <li className='font-bold'>{account.accountNumber}</li>
                        </ul>
                     </div>
                  </div>
               )
            }) : (
               <b>Nenhuma conta bancaria encontrada</b>
            )}
         </div>
      </div>
   )
}

export default Accounts
