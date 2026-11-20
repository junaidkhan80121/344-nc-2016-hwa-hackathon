"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, SCENT_FAMILIES } from "@/lib/products";

const spanPattern = [6, 3, 3, 4, 4, 4, 5, 3, 4, 4, 4];

export default function ShopView({ initialCategory = "all", initialFamily = "all", initialQuery = "" }) {
  const [category, setCategory] = useState(CATEGORIES.some((entry) => entry.id === initialCategory) ? initialCategory : "all");
  const [family, setFamily] = useState(SCENT_FAMILIES.some((entry) => entry.id === initialFamily) ? initialFamily : "all");
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState(initialQuery);

  const products = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== "all") list = list.filter((product) => product.category === category);
    if (family !== "all") list = list.filter((product) => product.family === family);
    const search = query.trim().toLowerCase();
    if (search) {
      list = list.filter((product) =>
        [product.name, product.tagline, product.description, ...(product.notes || [])]
          .join(" ")
          .toLowerCase()
          .includes(search)
      );
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, family, query, sort]);

  const hasFilters = category !== "all" || family !== "all" || query.trim() || sort !== "featured";

  function reset() {
    setCategory("all");
    setFamily("all");
    setQuery("");
    setSort("featured");
  }

  return (
    <>
      <section className="page-hero container">
        <div className="page-hero-grid">
          <div>
            <span className="eyebrow">The collection</span>
            <h1>
              Choose your <em>trail.</em>
            </h1>
            <p>
              Analog diffusers, compostable refill pods and bundles that make the first step easy. Every piece is
              made to be lived with, not replaced.
            </p>
          </div>
          <div className="pill">
            {PRODUCTS.length} objects · 5 scent families
          </div>
        </div>
      </section>

      <section className="container">
        <div className="shop-toolbar">
          <span className="filter-label" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            <SlidersHorizontal size={14} /> Filter
          </span>
          <div className="chip-row" role="group" aria-label="Product category">
            {CATEGORIES.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className={`filter-chip ${category === entry.id ? "is-active" : ""}`}
                onClick={() => setCategory(entry.id)}
              >
                {entry.label}
              </button>
            ))}
          </div>
          <span className="toolbar-spacer" />
          <label className="search-field">
            <Search size={15} />
            <span className="sr-only">Search products</span>
            <input
              type="search"
              placeholder="Search scents or objects"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <select className="select-field" value={family} onChange={(event) => setFamily(event.target.value)} aria-label="Scent family">
            {SCENT_FAMILIES.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.id === "all" ? "All scent families" : entry.label}
              </option>
            ))}
          </select>
          <select className="select-field" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>

        <div className="shop-results">
          <span>
            Showing {products.length} {products.length === 1 ? "object" : "objects"}
            {category !== "all" ? ` in ${CATEGORIES.find((entry) => entry.id === category)?.label}` : ""}
          </span>
          {hasFilters ? (
            <button type="button" className="link-btn" onClick={reset}>
              <X size={13} /> Clear filters
            </button>
          ) : null}
        </div>

        {products.length === 0 ? (
          <div className="empty-state">
            <h3>No trail matches that.</h3>
            <p>Try a different scent family, or clear the filters to see the whole collection.</p>
            <button type="button" className="btn btn-primary" onClick={reset}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="shop-grid">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                span={spanPattern[index % spanPattern.length]}
                tall={spanPattern[index % spanPattern.length] >= 5}
                compact={spanPattern[index % spanPattern.length] === 3}
              />
            ))}
          </div>
        )}
      </section>

      <section className="section container">
        <div className="bento">
          <div className="bento-card span-12" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20, background: "var(--sage-soft)" }}>
            <div>
              <span className="eyebrow">The refill club</span>
              <h2 style={{ fontSize: "clamp(28px, 3.4vw, 40px)", marginTop: 8 }}>Never run out of atmosphere.</h2>
              <p style={{ color: "var(--muted)", fontSize: 12.5, marginTop: 8, maxWidth: 520 }}>
                A fresh pack every 45, 60 or 90 days. Members save 15% and get first pick of limited trails. Pause or
                cancel whenever.
              </p>
            </div>
            <a className="btn btn-primary" href="/products/scenttrail-refill-club">
              Join the Refill Club
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
