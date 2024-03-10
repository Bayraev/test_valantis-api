import React, { useEffect, useState } from 'react';
import './App.css';
import AuthComponent from './Components/AuthComponent';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './app/store';
import { asyncGetProducts } from './app/features/ProductsSlice';
import { IProduct } from './app/models/AsyncFetchModel';

function App() {
  const dispatch = useAppDispatch();
  const isAuth: boolean = useSelector((state: RootState) => state.auth.isAuth);
  const products = useSelector((state: RootState) => state.products);
  const [currentPage, setCurrentPage] = useState(0);

  // Старт страницы
  useEffect(() => {
    if (isAuth) {
      dispatch(asyncGetProducts({ page: 0 }));
    }
  }, [isAuth]);

  // функция должна получить необходимую страницу для рендера.
  const handleNextPage = async () => {
    setCurrentPage(currentPage + 1);
    dispatch(asyncGetProducts({ page: currentPage + 1 }));
  };

  // Получить данные для предыдущей страницы
  const handlePrevPage = async () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      dispatch(asyncGetProducts({ page: currentPage - 1 }));
    }
  };

  return (
    <>
      {!isAuth && <AuthComponent />}
      {isAuth && (
        <div className="container">
          <h1 className="heading">Список товаров</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Цена</th>
                <th>Бренд</th>
              </tr>
            </thead>
            {products.pending ? (
              <h3>Lazy loading...</h3>
            ) : (
              <tbody>
                {products.products.result &&
                  products.products.result.map((product: IProduct) => {
                    return (
                      <tr>
                        <td>{product.id}</td>
                        <td>{product.product}</td>
                        <td>{product.price}</td>
                        <td>{product.brand}</td>
                      </tr>
                    );
                  })}
              </tbody>
            )}
          </table>
          <ul className="pagination">
            <li className="page-item">
              <span
                style={{ cursor: 'pointer' }}
                className="page-link"
                onClick={() => handlePrevPage()}>
                {'<'}
              </span>
              {currentPage > 0 && <span className="page-link">{currentPage - 1}</span>}

              <span className="page-link" style={{ border: '1px blue solid' }}>
                {currentPage}
              </span>
              <span className="page-link">{currentPage + 1}</span>
              <span
                style={{ cursor: 'pointer' }}
                className="page-link"
                onClick={() => handleNextPage()}>
                {'>'}
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
