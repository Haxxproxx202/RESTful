from django.contrib import admin
from .models import Post, Category


@admin.register(Post)
class AuthorAdmin(admin.ModelAdmin):
    date_hierarchy = 'published'
    list_display = ('title', 'id', 'slug', 'author', 'view_published', 'status')
    # list_editable = ('status', 'slug',)
    readonly_fields = ('published',)
    list_filter = (('author', admin.RelatedOnlyFieldListFilter),)
    preserve_filters = True
    radio_fields = {"status": admin.HORIZONTAL, "author": admin.VERTICAL}
    search_fields = ['title', 'published']
    search_help_text = "Szukaj po tytule"
    # raw_id_fields = ('author',) ## Changes from the dropdown til normal input
    # save_as = True

    prepopulated_fields = {'slug': ('title',), }
    actions_on_bottom = True
    actions_on_top = False

    # @admin.display(ordering='-view_author')
    # def view_author(self, obj):
    #     return obj.author

    @admin.display(empty_value='-empty-')
    def view_published(self, obj):
        return obj.published


admin.site.register(Category)
