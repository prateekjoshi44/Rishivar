import { useState } from 'react';
import Page from '../../layout/Page';
import Icons from '../../components/ui/Icons';
import SearchBar from '../../components/ui/SearchBar';

const Coupons = () => {
    const [search, setSearch] = useState("");

    const availableCoupons = [
        {
            id: 1,
            title: "Get Flat ₹125 OFF + ₹25 Rishivar Credits",
            description: "Save ₹125 & get extra cashback",
            code: "GETFLAT125",
        },
        {
            id: 2,
            title: "Flat ₹100 OFF",
            description: "Save ₹125 & get extra cashback",
            code: "GETFLAT100",
        },
    ];

    const otherCoupons = [
        {
            id: 3,
            title: "Get Flat ₹125 OFF + ₹25 Rishivar Credits",
            description: "Save ₹125 & get extra cashback",
            code: "GETFLAT125",
        },
    ];

    const CouponCard = ({ title, description, code }) => (
        <div className=" bg-white coupon-card border rounded-3 pt-3  mb-3">
            <div className="d-flex align-items-center mb-2 mx-3">
                {Icons.percentage("fs-3 me-2")}
                <h6 className="mb-0 fw-bold">{title}</h6>
            </div>
            <p className="text-muted mb-2 ms-4">{description}</p>
            <div className="d-flex justify-content-between align-items-center ms-4 my-3">
                <div className="coupon-code px-2 py-1 border rounded-2 btn bg-light">
                    {code}
                </div>
            </div>
            <button className="btn  w-100 btn-sm  text-info fw-semibold" style={{
                backgroundColor: "rgba(30, 144, 255, 0.25)"
            }}>APPLY</button>
        </div>
    );

    return (
        <Page>
            <SearchBar setIcons={false} search={search} setSearch={setSearch} placeholder="Search for Coupons" />

            {/* Available Coupons */}
            <section className="mt-4 ">
                <h5 className='fw-semibold mb-3'>Available Coupons</h5>
                {availableCoupons.map((coupon) => (
                    <CouponCard
                        key={coupon.id}
                        title={coupon.title}
                        description={coupon.description}
                        code={coupon.code}
                    />
                ))}
            </section>

            {/* Other Coupons */}
            <section className="mt-4">
                <h5 className='fw-semibold mb-3'>Other Coupons</h5>
                {otherCoupons.map((coupon) => (
                    <CouponCard
                        key={coupon.id}
                        title={coupon.title}
                        description={coupon.description}
                        code={coupon.code}
                    />
                ))}
            </section>
        </Page>
    );
};

export default Coupons;
