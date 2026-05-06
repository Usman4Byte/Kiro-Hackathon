import api from './api'

export const resumeService = {
  async analyze(formData) {
    try {
      // Step 1: Upload Resume (either file or text)
      // Note: We need to set the header to multipart/form-data when uploading files
      // Axios handles this automatically if we pass a FormData object.
      const resumeResponse = await api.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const resumeId = resumeResponse.data.resumeId;

      // Step 2: Upload/Analyze Job Description
      const jobText = formData.get('jobDescription');
      const jobResponse = await api.post('/job/analyze', { jobDescription: jobText });
      const jobId = jobResponse.data.jobId;

      // Step 3: Run Match Engine
      const matchResponse = await api.post('/match/analyze', { resumeId, jobId });
      const result = matchResponse.data;
      
      // Map _id to id for the frontend
      return {
        ...result,
        id: result._id
      };
      
    } catch (error) {
      throw error;
    }
  },

  async getHistory() {
    const response = await api.get('/match/history');
    return response.data;
  },

  async getAnalysisById(id) {
    const response = await api.get(`/match/${id}`);
    const result = response.data;
    return {
      ...result,
      id: result._id
    };
  },
  
  async deleteAnalysis(id) {
    // Demo implementation for delete if it doesn't exist on backend yet
    // return await api.delete(`/match/${id}`);
    return true;
  }
}

export const aiService = {
  async improveBullets(bullets, jobContext = '') {
    const response = await api.post('/ai/improve', { bullets, jobContext });
    return response.data;
  },
  
  async rewriteSummary(resumeData, jobContext) {
    const response = await api.post('/ai/rewrite-summary', { resumeData, jobContext });
    return response.data.summary;
  },
  
  async chat(message, context = {}) {
    const response = await api.post('/ai/chat', { message, context });
    return response.data;
  }
}
