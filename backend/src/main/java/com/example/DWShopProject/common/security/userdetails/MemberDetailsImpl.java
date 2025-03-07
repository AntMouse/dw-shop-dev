package com.example.DWShopProject.common.security.userdetails;
import com.example.DWShopProject.common.enums.MemberRoleEnum;
import com.example.DWShopProject.member.entity.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.ArrayList;
import java.util.Collection;


public class MemberDetailsImpl implements UserDetails {
    private final Member member
            ;
    private final String password;
    private final String userId;

    public MemberDetailsImpl(Member member, String password, String userId) {
        this.member = member;
        this.password = password;
        this.userId = userId;
    }

    public Member getMember(){
        return this.member;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        MemberRoleEnum usertype = member.getMemberType();
        String authority = usertype.getAuthority();

        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(authority);
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(simpleGrantedAuthority);

        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }/*false: 사용자 계정의 유효 기간 만료*/

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }/*false: 계정 잠금 상태*/

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }/*false: 비밀번호 만료*/

    @Override
    public boolean isEnabled() {
        return true;
    } /*false: 유효하지 않은 사용자*/


}
