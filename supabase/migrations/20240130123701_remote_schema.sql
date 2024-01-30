drop policy "Enable insert for anon user only" on "public"."email_registration";

create policy "Enable insert for anon user only"
on "public"."email_registration"
as permissive
for insert
to public
with check (true);



