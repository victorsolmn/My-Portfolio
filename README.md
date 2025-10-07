# Victor Salomon - Portfolio Website

A professional portfolio website built with a clean, minimal design inspired by Anthony Saltarelli's portfolio. Features a monochromatic color scheme, responsive 24-column grid system, and comprehensive project showcases.

## 🎨 Design System

### Color Palette
- **Monochromatic Design**: Pure white backgrounds with charcoal text
- `--color-white: #FFFFFF` - Background
- `--color-black: #1A1A1A` - Primary text
- `--color-text: #262626` - Body text
- `--color-text-light: #666666` - Secondary text
- `--color-border: #E5E5E5` - Borders and dividers

### Typography
- **Font**: Inter (Google Fonts)
- **Base Size**: 16px
- **Line Height**: 1.6
- Clean, sans-serif aesthetic with clear hierarchy

### Grid System
- **Desktop**: 24-column grid
- **Mobile**: 8-column grid
- **Gap**: 11px consistent spacing
- **Max Width**: 1500px
- **Responsive Breakpoint**: 768px

## 📁 File Structure

```
victor-portfolio/
├── index.html              # Homepage with hero, about, work sections
├── css/
│   ├── styles.css         # Main stylesheet (grid, navigation, sections)
│   └── project.css        # Project detail page styles
├── js/
│   └── script.js          # Interactions, animations, mobile menu
├── pages/
│   ├── assetworks.html    # Assetworks AI project details
│   ├── peersclub.html     # Peers Club project details
│   ├── mfine-lifecell.html # MFine & Lifecell project details
│   ├── meesho.html        # Meesho project details
│   └── contact.html       # Contact form page
├── assets/
│   └── images/            # Place images here (optional)
└── README.md
```

## 🚀 Features

### Homepage
- **Hero Section**: Large greeting with waving emoji, italic emphasis on "Product Manager"
- **Social Icons**: 5 outlined circular icons (LinkedIn, GitHub, Email, Phone, Portfolio)
- **About Section**: Professional background and interests
- **My Work**: 4 project cards in responsive grid layout
- **Side Projects**: 3 additional project showcases
- **CTA Section**: Prominent call-to-action to connect
- **Footer**: Copyright and social links

### Project Detail Pages
Each project includes:
- Hero section with large background and company logo
- Project metadata (Timeline, Role, Team)
- Overview section
- Challenge description
- Detailed approach with multiple subsections
- Results & impact cards
- Key features list
- Technologies & tools tags
- Navigation to next project

### Contact Page
- Large "CONTACT ME" heading
- Social media icons
- Contact form with fields:
  - First Name
  - Last Name
  - Email
  - Message
- Submit button triggers mailto link

### Responsive Design
- Desktop: 24-column grid, full navigation
- Tablet: Adaptive layouts
- Mobile: 8-column grid, hamburger menu
- All sections optimized for mobile viewing

### Interactions & Animations
- Smooth scroll navigation
- Mobile menu toggle with animation
- Scroll-triggered animations (fade-up)
- Navigation background blur on scroll
- Active nav link highlighting
- Project card hover effects
- Social icon hover transformations
- Subtle parallax on hero section

## 🌐 How to Use

### Option 1: Open Locally
```bash
# Simply open in browser
open index.html
```

### Option 2: Local Server
```bash
# Navigate to directory
cd ~/victor-portfolio

# Using Python 3
python3 -m http.server 8000

# Visit: http://localhost:8000
```

### Option 3: Deploy Online

#### **Netlify (Recommended - Easiest)**
1. Visit [netlify.com](https://www.netlify.com/)
2. Sign up for free account
3. Drag and drop the `victor-portfolio` folder
4. Get instant live URL
5. Optional: Connect custom domain

#### **GitHub Pages**
```bash
# Create new repository on GitHub
# Push code
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main

# Enable GitHub Pages in repository settings
# Your site: https://yourusername.github.io/portfolio
```

#### **Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd ~/victor-portfolio
vercel

# Follow prompts
```

## ✏️ Customization

### Update Your Information
1. **Homepage (`index.html`)**:
   - Edit hero title and subtitle
   - Update about section text
   - Modify social media links
   - Change contact information

2. **Contact Page (`pages/contact.html`)**:
   - Update email address in form handler
   - Modify social links

3. **Project Pages**:
   - Edit project content in each HTML file
   - Update metadata (timeline, role, team)
   - Modify results and features

### Change Colors
While the current design uses monochromatic colors, you can customize them in `css/styles.css`:

```css
:root {
    --color-white: #FFFFFF;
    --color-black: #1A1A1A;
    --color-text: #262626;
    --color-text-light: #666666;
    --color-border: #E5E5E5;
}
```

### Add Images
1. Place images in `assets/images/`
2. Update HTML to reference images:
   ```html
   <img src="../assets/images/your-image.jpg" alt="Description">
   ```
3. For project hero backgrounds, modify:
   ```css
   .project-hero-background {
       background-image: url('../assets/images/project-bg.jpg');
       background-size: cover;
   }
   ```

### Modify Grid
Adjust grid columns in `css/styles.css`:
```css
.grid {
    grid-template-columns: repeat(24, 1fr); /* Desktop */
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: repeat(8, 1fr); /* Mobile */
    }
}
```

## 🔧 Technical Details

### Technologies
- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **Vanilla JavaScript**: No frameworks
- **Google Fonts**: Inter font family

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Minimal dependencies
- Optimized CSS
- Efficient JavaScript
- Fast page loads
- Smooth animations (60fps)

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast text
- Focus states on all interactive elements

## 📧 Contact Information

- **Email**: victorsolmn@gmail.com
- **Phone**: +91 9901575048
- **LinkedIn**: [Victor Salomon](https://www.linkedin.com/in/victor-salomon)
- **GitHub**: [victorsolmn](https://github.com/victorsolmn)

## 📝 Key Design Principles

This portfolio follows Anthony Saltarelli's design philosophy:

1. **Minimalism**: Clean, uncluttered layouts
2. **Typography-First**: Text as primary design element
3. **Generous Whitespace**: Breathing room for content
4. **Subtle Interactions**: Professional, polished animations
5. **Grid-Based**: Structured, organized layouts
6. **Monochromatic**: Focus on content over color
7. **Responsive**: Mobile-first approach
8. **Performance**: Fast loading and smooth interactions

## 🎯 Next Steps

1. **Add Profile Photo**: Place in hero section
2. **Add Project Images**: Screenshots, mockups for each project
3. **Connect Domain**: Use custom domain name
4. **SEO Optimization**: Add meta tags, Open Graph tags
5. **Analytics**: Add Google Analytics or similar
6. **Blog Section**: Consider adding articles/case studies
7. **Testimonials**: Add client/colleague recommendations
8. **Resume Download**: PDF version of resume

## 📄 License

This is a personal portfolio website. Feel free to use the code structure for your own portfolio, but please update the content with your own information.

---

**Built with ❤️ by Victor Salomon**
*Designed following Anthony Saltarelli's minimal design principles*
