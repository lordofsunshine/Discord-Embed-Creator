new Vue({
  el: '#app',
  data: {
    embed: {
      title: '',
      description: '',
      color: '#D3D3D3',
      author: '',
      thumbnailURL: '',
      imageURL: ''
    },
    fields: [],
    webhookUrl: '',
    webhookDetails: null,
  },
  methods: {
    addField() {
      this.fields.push({ name: '', value: '', inline: false });
    },
    removeField(index) {
      this.fields.splice(index, 1);
    },
    toggleCheckbox(index) {
      this.fields[index].inline = !this.fields[index].inline;
    },
    fetchWebhookDetails() {
      if (!this.webhookUrl) return;

      fetch(this.webhookUrl)
        .then(response => response.json())
        .then(data => {
          this.webhookDetails = data;
        })
        .catch(error => {
          console.error('Error fetching webhook details:', error);
        });
    },
    getAvatarUrl() {
      return this.webhookDetails && this.webhookDetails.avatar 
        ? `https://cdn.discordapp.com/avatars/${this.webhookDetails.id}/${this.webhookDetails.avatar}.png` 
        : '../default-avatar.png';
    },
    postWebhook() {
      const embed = {
        title: this.embed.title,
        description: this.embed.description,
        color: parseInt(this.embed.color.replace('#', ''), 16),
        author: this.embed.author ? { name: this.embed.author } : undefined,
        fields: this.fields,
        thumbnail: this.embed.thumbnailURL ? { url: this.embed.thumbnailURL } : undefined,
        image: this.embed.imageURL ? { url: this.embed.imageURL } : undefined,
      };

      const payload = {
        embeds: [embed]
      };

      fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (response.ok) {
            alert('Message sent successfully');
          } else {
            alert('Failed to send message');
          }
        })
        .catch(error => {
          console.error('Error posting webhook:', error);
          alert('Error posting webhook');
        });
    },
    clearFields() {
      this.embed.title = '';
      this.embed.description = '';
      this.embed.color = '#000000';
      this.embed.author = '';
      this.embed.thumbnailURL = '';
      this.embed.imageURL = '';
      this.fields = [];
      this.webhookUrl = '';
      this.webhookDetails = null;
    }
  }
});
