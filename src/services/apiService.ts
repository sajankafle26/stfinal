import axios from 'axios';
import { COURSES, UPCOMING_BATCHES, INTERNSHIPS, PRODUCTS, BLOGS, TESTIMONIALS, VIDEO_COURSES, SERVICES } from '@/constants';
import { Course, UpcomingBatch, InternshipPosition, Product, Blog, Testimonial, VideoCourse, Partner, ServiceItem } from '@/types';

export const apiService = {
  _data: null as any,

  async getFullData() {
    try {
      const [courses, batches, products, blogs, testimonials, videoCourses] = await Promise.all([
        this.getCourses(),
        this.getBatches(),
        this.getProducts(),
        this.getBlogs(),
        this.getTestimonials(),
        this.getVideoCourses()
      ]);
      return {
        courses,
        batches,
        internships: INTERNSHIPS,
        products,
        blogs,
        testimonials,
        partners: [],
        videoCourses
      };
    } catch (err) {
      return { courses: COURSES, batches: UPCOMING_BATCHES };
    }
  },

  async getCourses(): Promise<Course[]> {
    try {
      const res = await axios.get('/api/live-courses');
      return res.data.length > 0 ? res.data : COURSES;
    } catch (e) {
      return COURSES;
    }
  },

  async getBatches(): Promise<UpcomingBatch[]> {
    try {
      const res = await axios.get('/api/upcoming-batches');
      return res.data.length > 0 ? res.data : UPCOMING_BATCHES;
    } catch (e) {
      return UPCOMING_BATCHES;
    }
  },

  async getBlogs(): Promise<Blog[]> {
    try {
      const res = await axios.get('/api/blogs');
      return res.data.length > 0 ? res.data : BLOGS;
    } catch (e) {
      return BLOGS;
    }
  },

  async getPartners(): Promise<Partner[]> {
    // Mock data for now, simulating API response
    return [
      { id: "p1", name: "Partner One", logoUrl: "https://sangalotech.com/wp-content/uploads/2025/02/1.png" },
      { id: "p2", name: "Partner Two", logoUrl: "https://sangalotech.com/wp-content/uploads/2025/02/2.png" },
      { id: "p3", name: "Partner Three", logoUrl: "https://sangalotech.com/wp-content/uploads/2025/02/3.png" },
      { id: "p4", name: "Partner Four", logoUrl: "https://sangalotech.com/wp-content/uploads/2025/02/4.png" },
      { id: "p5", name: "Partner Five", logoUrl: "https://sangalotech.com/wp-content/uploads/2025/02/5.png" },
      { id: "p6", name: "Partner Six", logoUrl: "https://sangalotech.com/wp-content/uploads/2025/02/6.png" },
      { id: "p7", name: "Partner Seven", logoUrl: "https://sangalotech.com/wp-content/uploads/2025/02/7.png" },
      { id: "p8", name: "Partner Eight", logoUrl: "https://sangalotech.com/wp-content/uploads/2025/02/8.png" },
    ];
  },

  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const res = await axios.get('/api/testimonials');
      return res.data.length > 0 ? res.data : TESTIMONIALS;
    } catch (e) {
      return TESTIMONIALS;
    }
  },

  async getVideoCourses(): Promise<VideoCourse[]> {
    try {
      const res = await axios.get('/api/courses');
      const apiData = res.data;
      if (!apiData || apiData.length === 0) return VIDEO_COURSES;

      return apiData.map((c: any) => ({
        ...c,
        id: c._id || c.id
      }));
    } catch (e) {
      return VIDEO_COURSES;
    }
  },

  async getInternships(): Promise<InternshipPosition[]> {
    try {
      const res = await axios.get('/api/internships');
      return res.data.length > 0 ? res.data : INTERNSHIPS;
    } catch (e) {
      return INTERNSHIPS;
    }
  },

  async getTechStack(): Promise<any[]> {
    try {
      const res = await axios.get('/api/tech-stack');
      return res.data;
    } catch (e) {
      return [];
    }
  },

  async getServices(): Promise<ServiceItem[]> {
    try {
      const res = await axios.get('/api/services');
      const apiData = res.data;

      // Merge API data with constants (prioritizing API data by slug)
      const mergedMap = new Map();

      // 1. Load constants
      SERVICES.forEach(s => mergedMap.set(s.slug, s));

      // 2. Overlay API data
      apiData.forEach((s: any) => {
        const slug = s.slug || (s.title ? s.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-') : 'service');
        mergedMap.set(slug, {
          ...s,
          slug,
          id: s._id || s.id
        });
      });

      return Array.from(mergedMap.values());
    } catch (e) {
      return SERVICES;
    }
  },

  async getServiceById(id: string): Promise<ServiceItem | undefined> {
    try {
      const res = await axios.get(`/api/services/${id}`);
      return res.data;
    } catch (e) {
      return SERVICES.find(s => s.id === id);
    }
  },

  async getServiceBySlug(slug: string): Promise<ServiceItem | undefined> {
    try {
      // 1. Try direct slug query first
      const res = await axios.get(`/api/services?slug=${slug}`);
      if (res.data && res.data.length > 0) return res.data[0];

      // 2. Fallback: Fetch all and check generated slugs (in case DB field is missing)
      const allServices = await this.getServices();
      const match = allServices.find(s => s.slug === slug);
      if (match) return match;

      // 3. Fallback to constants directly
      return SERVICES.find(s => s.slug === slug);
    } catch (e) {
      return SERVICES.find(s => s.slug === slug);
    }
  },

  async getProducts(): Promise<Product[]> {
    try {
      const res = await axios.get('/api/products');
      const apiData = res.data;

      // Merge API data with constants
      const mergedMap = new Map();

      // 1. Load constants
      PRODUCTS.forEach(p => mergedMap.set(p.id, p));

      // 2. Overlay API data
      apiData.forEach((p: any) => {
        const slug = p.slug || (p.title ? p.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-') : 'product');
        mergedMap.set(p._id || p.id, {
          ...p,
          slug,
          id: p._id || p.id
        });
      });

      return Array.from(mergedMap.values());
    } catch (e) {
      return PRODUCTS;
    }
  },

  async getEnrollments() {
    try {
      const res = await axios.get('/api/enrollments');
      return res.data;
    } catch (e) {
      return [];
    }
  },

  async submitContact(data: any) {
    return axios.post('/api/contact', data);
  },

  async submitEnrollment(data: any) {
    return axios.post('/api/enrollments', data);
  },

  // Mock saving methods for Dashboard (Keep for UI compatibility, but ideally migrate to real APIs)
  async saveCourse(data: any) { return axios.post('/api/live-courses', data); },
  async deleteCourse(id: string) { return axios.delete(`/api/live-courses/${id}`); },
  async saveBatch(data: any) { return axios.post('/api/upcoming-batches', data); },
  async deleteBatch(id: string) { return axios.delete(`/api/upcoming-batches/${id}`); },
  async saveBlog(data: any) { return axios.post('/api/blogs', data); },
  async deleteBlog(id: string) { return axios.delete(`/api/blogs/${id}`); },
  async saveTestimonial(data: any) { return axios.post('/api/testimonials', data); },
  async deleteTestimonial(id: string) { return axios.delete(`/api/testimonials/${id}`); },
  async saveVideoCourse(data: any) { return axios.post('/api/courses', data); },
  async deleteVideoCourse(id: string) { return axios.delete(`/api/courses/${id}`); },

  async getSuccessStories() {
    try {
      const res = await axios.get('/api/success-stories');
      return res.data;
    } catch (e) {
      return [];
    }
  },
  async saveSuccessStory(data: any) { return axios.post('/api/success-stories', data); },
  async deleteSuccessStory(id: string) { return axios.delete(`/api/success-stories/${id}`); },

  async getSiteSettings() {
    try {
      const res = await axios.get('/api/site-settings');
      return res.data;
    } catch (e) {
      return null;
    }
  },
  async saveSiteSettings(data: any) { return axios.post('/api/site-settings', data); },

  async login(credentials: any) {
    try {
      const res = await axios.post('/api/auth/login', credentials);
      return res.data;
    } catch (e: any) {
      throw e.response?.data || new Error('Login failed');
    }
  },
};
