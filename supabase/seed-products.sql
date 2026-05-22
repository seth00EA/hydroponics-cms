-- Optional: seed sample products after migration 008
-- Adjust image_url paths or upload images to Storage first

insert into public.products (
  name, description, price, category, image_url,
  stock_quantity, is_available, is_featured
) values
  (
    'Compact NFT System',
    'A space-saving nutrient film technique kit ideal for leafy greens and herbs on balconies or patios.',
    249.99, 'Systems', '/images/placeholder-system.svg', 20, true, true
  ),
  (
    'Deep Water Culture Bucket',
    'Single-plant DWC setup with air pump, net pot, and starter nutrients for beginners.',
    89.99, 'Systems', '/images/placeholder-bucket.svg', 15, true, true
  ),
  (
    'Bloom Boost Nutrient',
    'Ph-balanced flowering formula designed for fruiting crops in recirculating systems.',
    34.50, 'Nutrients', '/images/placeholder-nutrient.svg', 40, true, false
  ),
  (
    'Full-Spectrum LED Panel',
    'Energy-efficient grow light with adjustable spectrum for seedling through harvest stages.',
    179.00, 'Lighting', '/images/placeholder-light.svg', 5, true, true
  ),
  (
    'pH & EC Meter Kit',
    'Calibrated digital meters with storage solution for accurate reservoir monitoring.',
    64.99, 'Tools', '/images/placeholder-meter.svg', 12, true, false
  ),
  (
    'Coco Coir Grow Blocks',
    'Sustainable, pH-neutral grow medium—six compressed blocks expand for multiple transplant cycles.',
    28.00, 'Media', '/images/placeholder-media.svg', 30, true, false
  )
on conflict do nothing;
