desc "Remove guest accounts more than a day old."
task :guest_cleanup => :environment do
  User.where(guest: :true).destroy_all
end
