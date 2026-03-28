import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { editTransaction } from '../../redux/finance/financeOperations';

// Yup ile validation
const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .positive('Sum must be greater than zero') // Sıfırdan büyük olmalı
    .required('Sum is required'), // Zorunlu
  transactionDate: Yup.date()
    .required('Date is required') // Zorunlu
    .nullable(),
  comment: Yup.string().required('Comment is required'), // Zorunlu
});

const EditTransactionForm = ({ transaction, closeModal }) => {
  const dispatch = useDispatch();
  // İşlem türünü gösterebilmek için (Değiştirilimez)
  const isIncome = transaction.type === 'INCOME';
  const initialValues = {
    amount: transaction.amount || 0,
    transactionDate: transaction.transactionDate
      ? new Date(transaction.transactionDate)
      : new Date(),
    comment: transaction.comment || '',
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    // APInin beklediği format
    const payload = {
      id: transaction.id,
      data: {
        amount: values.amount,
        transactionDate: values.transactionDate.toISOString(),
        comment: values.comment,
      },
    };

    try {
      await dispatch(editTransaction(payload)).unwrap();
      closeModal();
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="edit-form-container">
      <div className="transaction-type-display">
        <span className={isIncome ? 'income-text' : 'expense-text'}>
          {isIncome ? 'Income' : 'Expense'}
        </span>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="Sum">Sum</label>
              <Field
                type="number"
                name="amount"
                id="amount"
                placeholder="0.00"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="transactionDate">Date</label>
              <DatePicker
                id="transactionDate"
                selected={values.transactionDate}
                onChange={(date) => setFieldValue('transactionDate', date)}
                dateFormat="dd.MM.yyyy"
              />
              <ErrorMessage
                name="transactionDate"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="comment">Comment</label>
              <Field
                as="textarea"
                name="comment"
                id="comment"
                placeholder="Comment"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className="error-message"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-save-gradient"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>

            <button type="button" onClick={closeModal} className="btn-cancel">
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditTransactionForm;
