import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import {
  editTransaction,
  fetchCategories,
} from '../../redux/finance/financeOperations';
import css from './EditTransactionForm.module.css';
import calendarIcon from '../../assets/icons/calendar.svg';

// Yup ile validation
const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError('Sum must be a number')
    .positive('Sum must be greater than zero') // Sıfırdan büyük olmalı
    .required('Sum is required'), // Zorunlu
  transactionDate: Yup.date().required('Date is required'), // Zorunlu
  comment: Yup.string().required('Comment is required'), // Zorunlu
  categoryId: Yup.string().when('type', {
    is: 'EXPENSE',
    then: () => Yup.string().required('Category is required'),
  }),
});

const EditTransactionForm = ({ transaction, closeModal }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.finance.categories);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const initialValues = {
    type: transaction.type || 'INCOME',
    categoryId: transaction.categoryId || '',
    amount: transaction.amount || 0,
    transactionDate: transaction.transactionDate
      ? new Date(transaction.transactionDate)
      : new Date(),
    comment: transaction.comment || '',
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      id: transaction.id,
      data: {
        type: values.type,
        amount: Number(values.amount),
        transactionDate: values.transactionDate.toISOString(),
        comment: values.comment,
      },
    };

    if (values.type === 'EXPENSE' && values.categoryId) {
      payload.data.categoryId = values.categoryId;
    }

    try {
      await dispatch(editTransaction(payload)).unwrap();
      toast.success('Transaction updated successfully!');
      closeModal();
    } catch (error) {
      toast.error(error?.message || 'Failed to update transaction.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.editFormContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => {
          return (
            <Form style={{ width: '100%' }}>
              <div className={css.transactionTypeDisplay}>
                <span
                  className={`${css.typeText} ${values.type === 'INCOME' ? css.activeIncome : css.inactiveText}`}
                >
                  Income
                </span>
                <span className={css.slash}>/</span>
                <span
                  className={`${css.typeText} ${values.type === 'EXPENSE' ? css.activeExpense : css.inactiveText}`}
                >
                  Expense
                </span>
              </div>

              {values.type === 'EXPENSE' && (
                <div className={css.formGroup}>
                  <Field
                    as="select"
                    name="categoryId"
                    className={css.inputField}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {Array.isArray(categories) &&
                      categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </Field>
                  <ErrorMessage
                    name="categoryId"
                    component="div"
                    className={css.errorMessage}
                  />
                </div>
              )}
              <div className={css.rowGroup}>
                <div className={css.formGroup}>
                  <Field
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="0.00"
                    className={`${css.inputField} ${css.amountInput}`}
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className={css.errorMessage}
                  />
                </div>

                <div className={css.formGroup}>
                  <div className={css.dateWrapper}>
                    <DatePicker
                      id="transactionDate"
                      selected={values.transactionDate}
                      onChange={(date) =>
                        setFieldValue('transactionDate', date)
                      }
                      dateFormat="dd.MM.yyyy"
                      className={css.inputField}
                    />
                    <div className={css.calendarIcon}>
                      <img
                        src={calendarIcon}
                        alt="Calendar"
                        width="18"
                        height="20"
                      />
                    </div>
                  </div>

                  <ErrorMessage
                    name="transactionDate"
                    component="div"
                    className={css.errorMessage}
                  />
                </div>
              </div>

              <div className={css.formGroup}>
                <Field
                  type="text"
                  name="comment"
                  id="comment"
                  placeholder="Comment"
                  className={css.inputField}
                />
                <ErrorMessage
                  name="comment"
                  component="div"
                  className={css.errorMessage}
                />
              </div>
              <div className={css.buttonGroup}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${css.btn} ${css.btnSave}`}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  className={`${css.btn} ${css.btnCancel}`}
                >
                  Cancel
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditTransactionForm;
