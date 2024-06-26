import Modal from "@/components/Modal";
import PriceInfo from "@/components/PriceInfo";
import ProductCard from "@/components/ProductCard";
import { getProductById, similarProducts } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
    params: { id: String}
}

const ProductDetails = async({ params: { id }}: Props) => {
    // @ts-ignore
    const product = await getProductById(id);

    if(!product) redirect('/');

// @ts-ignore
    const getSimilarProducts = await similarProducts(id);


  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
            <Image 
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="mx-auto"
            />
        </div>

        <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
                <div className="flex flex-col gap-3">
                    <p className="text-[28px] text-secondary font-semibold">{product.title}</p>

                    <Link
                        href={product.url}
                        target="_blank"
                        className="text-base text-black opacity-50"
                    >
                        Visit Product
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    <div className="product-hearts">
                        <Image 
                            src="/assets/icons/red-heart.svg"
                            alt="heart"
                            width={20}
                            height={20}
                        />

                        <p
                            className="text-base font-semibold text-[#D46F77]"
                        >{product.reviewsCount}</p>
                    </div>

                    <div className="p-2 bg-white-200 rounded-10">
                        <Image 
                            src="/assets/icons/bookmark.svg"
                            alt="bookmark"
                            width={20}
                            height={20}
                        />
                    </div>

                    <div className="p-2 bg-white-200 rounded-10">
                        <Image 
                            src="/assets/icons/share.svg"
                            alt="share"
                            width={20}
                            height={20}
                        />
                    </div>
                </div>
            </div>

            <div className="product-info">
                <div className="flex flex-col gap-2">
                    <p
                        className="text-[34px] text-secondary font-bold"
                    >{product.currency} {formatNumber(product.currentPrice)}
                    </p>
                    <p
                        className="text-[21px] text-black opacity-50 line-through"
                    >{product.currency} {formatNumber(product.originalPrice)}
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex gap-3">
                        <div className="product-stars">
                            <Image 
                                src="/assets/icons/star.svg"
                                alt="star"
                                width={16}
                                height={16}
                            />
                            <p className="text-sm text-rpimary-orange fonr-semibold">
                                {product.rating || '5'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-7 flex flex-col gap-5">
                <div className="flex gap-5 flex-wrap">
                    <PriceInfo
                        title="Current Price"
                        icon="/assets/icons/price-tag.svg"
                        value={`${product.currency} ${formatNumber(product.currentPrice)}`}
                    />
                    <PriceInfo
                        title="Average Price"
                        icon="/assets/icons/chart.svg"
                        value={`${product.currency} ${formatNumber(product.averagePrice)}`}
                    />
                    <PriceInfo
                        title="Highest Price"
                        icon="/assets/icons/arrow-up.svg"
                        value={`${product.currency} ${formatNumber(product.highestPrice)}`}
                    />
                    <PriceInfo
                        title="Lowest Price"
                        icon="/assets/icons/arrow-down.svg"
                        value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
                    />
                </div>
            </div>
            <Modal 
            // @ts-ignore
                productId = {id}
            />
        </div>
      </div>

      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
            <h3 className="font-bold text-secondary text-2xl">Product Description</h3>
        </div>
        <div className="flex flex-col gap-4">
            <p className="">{product.description}</p>
        </div>

        <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
            <Image 
                src="/assets/icons/bag.svg"
                alt="cart"
                width={20}
                height={20}
            />
            <Link href="/">
                Buy Now
            </Link>
        </button>
      </div>
        {
            getSimilarProducts && getSimilarProducts?.length > 0 &&
            (<div className="py-14 flex flex-col gap-2 w-full">
                <p className="section-text">Similar Products</p>

                <div className="flex flex-wrap gap-10 mt-7 w-full">
                    {getSimilarProducts.map((product)=>(
                        <ProductCard 
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            </div>)
        }

    </div>
  )
}

export default ProductDetails
