import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  editTransaction,
  fetchCategories,
} from '../../redux/finance/financeOperations';
import css from './EditTransactionForm.module.css';
import calendarIcon from '../../assets/icons/calendar.svg';
import CursorPointerIcon from '@/assets/icons/cursor-pointer-icon.svg?react';

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

const formatTransactionDate = (value) => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const EditTransactionForm = ({ transaction, closeModal }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.finance.categories);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const initialValues = {
    type: transaction.type || 'INCOME',
    categoryId: transaction.categoryId || '',
    amount: Math.abs(transaction.amount) || 0,
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
        amount: values.type === 'EXPENSE' ? -Math.abs(Number(values.amount)) : Math.abs(Number(values.amount)),
        transactionDate: formatTransactionDate(values.transactionDate),
        comment: values.comment,
      },
    };

    if (values.type === 'EXPENSE' && values.categoryId) {
      payload.data.categoryId = values.categoryId;
    }

    try {
      await dispatch(editTransaction(payload)).unwrap();
      closeModal();
    } catch {
      // toast is handled in editTransaction operation
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
                <div className={css.formGroup} ref={categoryRef}>
                  <div className={css.categoryField}>
                    <button
                      type="button"
                      className={`${css.categoryTrigger} ${isCategoryOpen ? css.categoryTriggerOpen : ''} ${values.categoryId ? css.categorySelected : ''}`}
                      onClick={() => setIsCategoryOpen((o) => !o)}
                      aria-haspopup="listbox"
                      aria-expanded={isCategoryOpen}
                    >
                      <span>
                        {categories.find((c) => c.id === values.categoryId)?.name || 'Select a category'}
                      </span>
                      <span className={css.categoryTriggerIcons}>
                        <span className={`${css.categoryChevron} ${isCategoryOpen ? css.categoryChevronOpen : ''}`} aria-hidden="true" />
                      </span>
                    </button>

                    {isCategoryOpen && (
                      <ul className={css.categoryMenu} role="listbox">
                        {Array.isArray(categories) && categories
                          .filter((c) => c.type !== 'INCOME')
                          .map((cat) => (
                            <li key={cat.id}>
                              <button
                                type="button"
                                className={`${css.categoryOption} ${cat.id === values.categoryId ? css.categoryOptionActive : ''}`}
                                onClick={() => {
                                  setFieldValue('categoryId', cat.id);
                                  setIsCategoryOpen(false);
                                }}
                              >
                                <span>{cat.name}</span>
                                {cat.id === values.categoryId && (
                                  <CursorPointerIcon className={css.categoryOptionPointer} aria-hidden="true" />
                                )}
                              </button>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                  <ErrorMessage name="categoryId" component="div" className={css.errorMessage} />
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
