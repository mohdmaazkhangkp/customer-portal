import React, { useState, useCallback, useRef, useEffect, SetStateAction, Dispatch } from "react";
import { faker } from "@faker-js/faker";
import { Customer, setSelectedCustomer } from "../store/customerSlice";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";

const generateCustomers = (count: number): Customer[] => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    title: faker.person.jobTitle(),
    address: faker.location.streetAddress(),
  }));
};

interface CustomersListProps {
    setShowMenu: Dispatch<SetStateAction<boolean>>;
  }

const CustomersList: React.FC<CustomersListProps> = ({setShowMenu}) => {
  const [customers, setCustomers] = useState<Customer[]>(generateCustomers(20));
  const [hasMore, setHasMore] = useState(true);
  const selectedCustomer = useSelector((state: RootState) => state.customer);
  const dispatch = useDispatch();

  const loadMoreCustomers = useCallback(() => {
    const newCustomers = generateCustomers(20);
    setCustomers((prev) => [...prev, ...newCustomers]);

    if (customers.length + newCustomers.length >= 1000) {
      setHasMore(false);
    }
  }, [customers]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCustomerRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreCustomers();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMoreCustomers, hasMore]
  );

  useEffect(() => {
    dispatch(setSelectedCustomer(customers[0]));
  }, []);

  return (
    <div className="z-20 bg-gray-50 fixed left-0 pr-5 pl-3 top-[3.75rem] bottom-0 overflow-y-auto">
      {customers.map((customer, index) => (
        <div
          key={customer.id}
          ref={index === customers.length - 1 ? lastCustomerRef : null}
          className={`px-4 py-6 cursor-pointer ${
            customer?.id === selectedCustomer?.id
              ? "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
          onClick={() => {
            dispatch(setSelectedCustomer(customer));
            setShowMenu(false);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
        >
          <h2 className="font-bold">{customer.name}</h2>
          <p>{customer.title}</p>
        </div>
      ))}
      {hasMore && <p>Loading more customers...</p>}
    </div>
  );
};

export default CustomersList;
